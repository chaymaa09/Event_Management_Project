package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.Event;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    public Optional<Category> findByNameIgnoreCase(String name);
    public Boolean subscribeToCategory(Long categoryId, Long userId);
    public Boolean unsubscribeFromCategory(Long categoryId, Long userId);
    public Boolean isSubscribedToCategory(Long categoryId, Long userId);
}
