package com.example.eventmangementproject.service;

import com.example.eventmangementproject.dao.entities.User;

import java.util.List;

public interface UserService {

     User addUser(User user);
     User updateUser(User user);
     boolean deleteUser(Long userId);
     List<User> getAllUsers();
     User getUserById(Long userId);

}
