package com.example.eventmanagementproject.web;

import com.example.eventmanagementproject.dao.entities.AuthType;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import com.example.eventmanagementproject.dto.LoginRequest;
import com.example.eventmanagementproject.dto.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        logger.info("Registration attempt for email: {}", request.getEmail());

        if (request.getName() == null || request.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Name is required"));
        }
        if (request.getEmail() == null || !request.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid email format"));
        }
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return ResponseEntity.badRequest().body(Map.of("error", "Password must be at least 6 characters"));
        }

        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            logger.warn("Registration failed: Email already exists - {}", request.getEmail());
            return ResponseEntity.badRequest().body(Map.of("error", "Email already registered"));
        }

        // Create user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAuthType(AuthType.LOCAL); // Convert enum to string
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        User saved = userRepository.save(user);
        logger.info("User registered successfully: ID={}, Email={}", saved.getId(), saved.getEmail());

        return ResponseEntity.ok(Map.of(
                "message", "User registered successfully",
                "userId", saved.getId(),
                "name", saved.getName(),
                "email", saved.getEmail()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        logger.info("Login attempt for email: {}", request.getEmail());

        try {
            // Authenticate
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            User user = (User) auth.getPrincipal();
            logger.info("User logged in successfully: ID={}, Email={}", user.getId(), user.getEmail());

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "userId", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail()));

        } catch (BadCredentialsException e) {
            logger.warn("Login failed: Invalid credentials for email - {}", request.getEmail());
            return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
        } catch (DisabledException e) {
            logger.warn("Login failed: Account disabled - {}", request.getEmail());
            return ResponseEntity.status(403).body(Map.of("error", "Account is disabled"));
        } catch (Exception e) {
            logger.error("Login failed for email: {}", request.getEmail(), e);
            return ResponseEntity.status(500).body(Map.of("error", "An error occurred during login"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }

        User user = (User) authentication.getPrincipal();
        logger.debug("Fetching current user info: ID={}", user.getId());

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "avatarUrl", user.getAvatarUrl() != null ? user.getAvatarUrl() : ""));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication) {
        if (authentication != null) {
            User user = (User) authentication.getPrincipal();
            logger.info("User logged out: ID={}", user.getId());
        }
        return ResponseEntity.ok(Map.of("message", "Logged out successfully"));
    }
}
