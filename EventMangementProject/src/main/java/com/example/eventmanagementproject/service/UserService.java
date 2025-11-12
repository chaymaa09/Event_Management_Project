package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.User;

import java.util.List;

public interface UserService {

     User addUser(User user);
     User updateUser(User user);
     boolean deleteUserById(Long userId);
     boolean deleteUser(User user);
     List<User> getAllUsers();
     User getUserById(Long userId);

}
