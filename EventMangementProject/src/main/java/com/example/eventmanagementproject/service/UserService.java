package com.example.eventmanagementproject.service;

import java.util.List;

import org.springframework.security.oauth2.jwt.Jwt;

import com.example.eventmanagementproject.dao.entities.User;

public interface UserService {

     User addUser(User user);
     User updateUser(User user);
     boolean deleteUserById(Long userId);
     boolean deleteUser(User user);
     List<User> getAllUsers();
     User getUserById(Long userId);
     User ensureUserExists(Jwt jwt);
     User updateUserProfile(Jwt jwt, User user);
     User addEmailToUser(Jwt jwt, String email);
     User removeEmailFromUser(Jwt jwt, int index);

     /**
      * Creates or updates the local User record for the currently authenticated Keycloak user.
      * Uses JWT claims (sub/email/name/preferred_username) as the source of truth.
      */


}
