package com.example.eventmanagementproject;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
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
        
        Stream.of("ev1", "ev2", "ev3").forEach( title -> {
            Event event = new Event();
            event.setTitle(title);
            event.setDescription(title.toLowerCase() + "Descreption");
            event.setCreationDate(ZonedDateTime.now());
            event.setStartDate(null);
            event.setEndDate(null);
            eventRepository.save(event);
        });

        
        eventRepository.findAll().forEach(event ->
            System.out.println("event created: ID=" + event.getId() +
                             ", title=" + event.getTitle() +
                             ", descreption=" + event.getDescription())
        );
        
        System.out.println("Test data created successfully!");
    }
}