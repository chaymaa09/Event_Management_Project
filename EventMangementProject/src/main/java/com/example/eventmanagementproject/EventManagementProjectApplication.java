package com.example.eventmanagementproject;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.stream.Stream;

@SpringBootApplication
public class EventManagementProjectApplication implements CommandLineRunner {
    
    @Autowired
    private EventRepository eventRepository;

    public static void main(String[] args) {
        SpringApplication.run(EventManagementProjectApplication.class, args);
    }

    @Override
    @Transactional  // keeps the session open for lazy loading
    public void run(String... args) throws Exception {

        System.out.println("app running successfully!");
    }
}