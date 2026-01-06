package com.example.eventmanagementproject.service;

import java.util.List;

import com.example.eventmanagementproject.dao.entities.User;
import org.springframework.security.oauth2.jwt.Jwt;

public interface UserService {

     User addUser(User user);
     User updateUser(User user);
     boolean deleteUserById(Long userId);
     boolean deleteUser(User user);
     List<User> getAllUsers();
     User getUserById(Long userId);
     User ensureUserExists(Jwt jwt);

     

}
