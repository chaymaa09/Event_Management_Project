package com.example.eventmanagementproject.service;
import com.example.eventmanagementproject.dao.entities.Event;

import java.util.List;

public interface EventService {
    List<Event> findAllEvent();
    Event findEventById(Long id);
    Event addEvent(Event event);
    Event updateEvent(Event event);
    boolean deleteEvent(Long eventId);
    /// Additional methods we can add later ////////////////

    // List<Event> findUpcomingEvents();  // Events in the future
    // List<Event> findEventsByCreator(Long creatorId);  // My events
    // List<Event> findPublicEvents();  // Only public events
    // List<Event> findEventsByTag(String tagName);  // Filter by tag
    // List<Event> searchEvents(String keyword);  // Search by title/description
    // boolean isEventFull(Long eventId);  // Check capacity
    // int getAvailableSpots(Long eventId);  // Remaining capacity

}
