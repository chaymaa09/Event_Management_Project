package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.AuthType;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public User addUser(User user) {
        if (userRepository.existsById(user.getId())) {
            return null;
        }
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean deleteUserById(Long userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteUser(User user) {
        if (userRepository.existsById(user.getId())) {
            userRepository.deleteById(user.getId());
            return true;
        }
        return false;
    }



    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null  );
    }

    // Load user from database by email
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

    // Load user by ID (useful for JWT authentication)
    public UserDetails loadUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + id));
    }

    @Override
    @Transactional
    public User ensureUserExists(Jwt jwt) {
        if (jwt == null) {
            throw new IllegalArgumentException("Missing JWT");
        }

        String keycloakId = jwt.getSubject(); // sub
        String email = jwt.getClaimAsString("email");
        String name = firstNonBlank(
                jwt.getClaimAsString("name"),
                jwt.getClaimAsString("preferred_username"),
                jwt.getClaimAsString("username"));

        String idp = jwt.getClaimAsString("idp");

        if (keycloakId == null || keycloakId.isBlank()) {
            throw new IllegalArgumentException("Missing 'sub' claim");
        }

        User user = userRepository.findByKeycloakId(keycloakId).orElseGet(() -> {
            User u = new User();
            u.setKeycloakId(keycloakId);
            u.setAuthType(AuthType.OAUTH);
            u.setEnabled(true);
            // local password is not used for Keycloak users
            u.setPassword("");
            return u;
        });

        if (email != null && !email.isBlank()) {
            user.setEmail(email);
        }
        if (name != null && !name.isBlank()) {
            user.setName(name);
        }
        if (idp != null && !idp.isBlank()) {
            user.setProvider(idp);
        }

        user.setAvatarUrl("https://commons.wikimedia.org/wiki/File:Unknown_person.jpg");
        return userRepository.save(user);
    }

    private static String firstNonBlank(String... values) {
        for (String v : values) if (v != null && !v.isBlank()) return v;
        return null;
    }
}
