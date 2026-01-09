package com.example.eventmanagementproject.web;

import java.util.List;
import java.util.Optional;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.service.CategoryService;
import com.example.eventmanagementproject.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.repositories.CategoryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    @Autowired
    private  CategoryRepository categoryRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/events/{name}")
    public List<Event> getEventsByCategory(@PathVariable String name) {
        return eventService.findEventsByCategory(name);
    }



    @GetMapping("/{categoryName}")
    public Optional<Category> getCategoryByName(@PathVariable String categoryName) {
        return categoryService.findByNameIgnoreCase(categoryName);

    }

    @PostMapping("/{categoryId}/subscribe/{userId}")
    public Boolean subscribeToCategory(@PathVariable Long categoryId, @PathVariable Long userId) {
        return categoryService.subscribeToCategory(categoryId, userId);
    }

    @PostMapping("/{categoryId}/unsubscribe/{userId}")
    public Boolean unsubscribeFromCategory(@PathVariable Long categoryId, @PathVariable Long userId) {
        return categoryService.unsubscribeFromCategory(categoryId, userId);
    }

    @GetMapping("/{categoryId}/is-subscribed/{userId}")
    public Boolean verifySubscription(@PathVariable Long categoryId, @PathVariable Long userId) {
        return categoryService.isSubscribedToCategory(categoryId, userId);
    }
}
