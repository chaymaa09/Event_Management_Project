package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dto.EventCreateDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EventService {
    List<Event> findAllEvent();

    Event findEventById(Long id);

    Event updateEvent(Event event);

    boolean deleteEvent(Long eventId);

    Event addEvent(EventCreateDTO dto, String creatorEmail);

    List<Event> findEventsByCategory(String categoryName);

    List<Event> findEventsByCity(String cityName);

    /// Additional methods we can add later ////////////////

    // List<Event> findUpcomingEvents(); // Events in the future
    // List<Event> findEventsByCreator(Long creatorId); // My events
    // List<Event> findPublicEvents(); // Only public events
    // List<Event> findEventsByTag(String tagName); // Filter by tag
    // List<Event> searchEvents(String keyword); // Search by title/description
    // boolean isEventFull(Long eventId); // Check capacity
    // int getAvailableSpots(Long eventId); // Remaining capacity

    List<Event> findEventByCreator(Long Id);


}
