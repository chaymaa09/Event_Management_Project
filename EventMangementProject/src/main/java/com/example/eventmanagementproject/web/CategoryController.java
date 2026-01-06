package com.example.eventmanagementproject.web;

import java.util.List;

import com.example.eventmanagementproject.dao.entities.Event;
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

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @PostMapping("/event/{name}")
    public List<Event> getEventsByCategory(@PathVariable String name) {
        return eventService.findEventsByCategory(name);
    }
}
