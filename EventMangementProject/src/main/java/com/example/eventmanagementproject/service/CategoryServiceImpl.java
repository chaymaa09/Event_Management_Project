package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.CategoryRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Optional<Category> findByNameIgnoreCase(String name){
        return categoryRepository.findByNameIgnoreCase(name);
    }
    @Override
    public Boolean subscribeToCategory(Long categoryId, Long userId){
        if(userRepository.existsById(userId)){
            User user = userRepository.findById(userId).get();
            Category category = categoryRepository.findById(categoryId).get();
            category.getSubscribers().add(user);
            return true;
        }else{
            return false;
        }

    }

}

