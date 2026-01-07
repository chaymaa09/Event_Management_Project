package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.CategoryRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public Boolean subscribeToCategory(Long categoryId, Long userId){
        if(userRepository.existsById(userId) && categoryRepository.existsById(categoryId)){
            User user = userRepository.findById(userId).get();
            Category category = categoryRepository.findById(categoryId).get();
            category.getSubscribers().add(user);
            user.getSubscribedCategories().add(category);
            userRepository.save(user);
            
            return true;
        }else{
            return false;
        }



    }
    @Override
    @Transactional
    public Boolean unsubscribeFromCategory(Long categoryId, Long userId){
        if(userRepository.existsById(userId) && categoryRepository.existsById(categoryId)){
            User user = userRepository.findById(userId).get();
            Category category = categoryRepository.findById(categoryId).get();
            category.getSubscribers().remove(user);
            user.getSubscribedCategories().remove(category);
            userRepository.save(user);
            return true;
        }else{
            return false;
        }
    }

    @Override
    @Transactional
    public Boolean isSubscribedToCategory(Long categoryId, Long userId) {
        try {
            if (userRepository.existsById(userId) && categoryRepository.existsById(categoryId)) {
                User user = userRepository.findById(userId).get();
                Category category = categoryRepository.findById(categoryId).get();
                return category.getSubscribers().contains(user);
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return false;
    }
}

