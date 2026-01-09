package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final KeycloakAdminService keycloakAdminService;

    @org.springframework.beans.factory.annotation.Value("${app.user-avatar-dir:assets/userUploads}")
    private String avatarDir;

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
        String providerId = keycloakId;

        if (keycloakId == null || keycloakId.isBlank()) {
            throw new IllegalArgumentException("Missing 'sub' claim");
        }

        // Only set fields from the JWT when creating a new local record.
        // This avoids overwriting user-modified profile fields (like name) in the local DB
        // when Keycloak's token still contains old values.
        User user = userRepository.findByKeycloakId(keycloakId).orElseGet(() -> {
            User u = new User();
            u.setKeycloakId(keycloakId);
            u.setEnabled(true);
            u.setPassword("oauth");  // Required non-null field
            // Set defaults on creation with proper fallbacks
            u.setEmail(email != null && !email.isBlank() ? email : (keycloakId + "@keycloak.local"));
            u.setName(name != null && !name.isBlank() ? name : keycloakId);
            // Set default avatar only on creation
            u.setAvatarUrl("https://cdn-icons-png.flaticon.com/512/6780/6780628.png");
            // Set provider info on creation
            if (idp != null && !idp.isBlank()) {
                u.setProvider(idp);
                u.setProviderId(providerId);
            }
            return u;
        });

        // NOTE: Do not overwrite local user fields from JWT on subsequent syncs.
        // If you want to allow Keycloak to update local fields, implement controlled
        // sync/consent logic here. For now we persist only the current user record.

        return userRepository.save(user);
    }

    private static String firstNonBlank(String... values) {
        for (String v : values) if (v != null && !v.isBlank()) return v;
        return null;
    }

    // Update the profile of the currently authenticated user using JWT to locate the DB record
    @Override
    @Transactional
    public User updateUserProfile(Jwt jwt, User updates){
        if (jwt == null) {
            throw new IllegalArgumentException("Missing JWT");
        }
        // Ensure local user exists and fetch the record
        User user = ensureUserExists(jwt);

        if (updates == null) return user;

        // Only copy allowed updatable fields
        if (updates.getName() != null) user.setName(updates.getName());
        if (updates.getPhone() != null) user.setPhone(updates.getPhone());
        if (updates.getBio() != null) user.setBio(updates.getBio());
        if (updates.getInstagramAccount() != null) user.setInstagramAccount(updates.getInstagramAccount());
        if (updates.getXAccount() != null) user.setXAccount(updates.getXAccount());
        if (updates.getYoutubeAccount() != null) user.setYoutubeAccount(updates.getYoutubeAccount());
        if (updates.getLinkedinAccount() != null) user.setLinkedinAccount(updates.getLinkedinAccount());
        if (updates.getWebsite() != null) user.setWebsite(updates.getWebsite());
        if (updates.getEmailSup() != null) user.setEmailSup(updates.getEmailSup());

        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User addEmailToUser(Jwt jwt, String email) {
        User user = ensureUserExists(jwt);
        if (user.getEmailSup() == null) {
            user.setEmailSup(new java.util.ArrayList<>());
        }
        user.getEmailSup().add(email);
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public User removeEmailFromUser(Jwt jwt, int index) {
        User user = ensureUserExists(jwt);
        if (user.getEmailSup() != null && index >= 0 && index < user.getEmailSup().size()) {
            user.getEmailSup().remove(index);
            return userRepository.save(user);
        }
        return user;
    }

    @Override
    @Transactional
    public boolean deleteCurrentUser(Jwt jwt) {
        if (jwt == null) {
            return false;
        }
        String keycloakId = jwt.getSubject();
        if (keycloakId == null || keycloakId.isBlank()) {
            return false;
        }
        // Try to delete from Keycloak first (best effort)
        keycloakAdminService.deleteUserById(keycloakId);

        // Then delete from local database
        return userRepository.findByKeycloakId(keycloakId)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }

    @Override
    @Transactional
    public User updateAvatar(Jwt jwt, org.springframework.web.multipart.MultipartFile avatar) {
        User user = ensureUserExists(jwt);

        try {
            Path uploadPath = Paths.get(avatarDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFilename = Optional.ofNullable(avatar.getOriginalFilename()).orElse("avatar");
            String extension = "";
            int dotIndex = originalFilename.lastIndexOf('.');
            if (dotIndex != -1) {
                extension = originalFilename.substring(dotIndex);
            }

            String filename = "avatar-" + user.getId() + extension;
            Path targetFile = uploadPath.resolve(filename);
            Files.copy(avatar.getInputStream(), targetFile, StandardCopyOption.REPLACE_EXISTING);

            String urlPath = "/" + avatarDir.replace("\\", "/") + "/" + filename;
            user.setAvatarUrl(urlPath);
            return userRepository.save(user);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store avatar", e);
        }
    }


}