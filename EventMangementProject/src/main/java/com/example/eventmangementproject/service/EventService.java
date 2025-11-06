package com.example.eventmangementproject.service;

import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.dao.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public List<Event> findAllEvent() {
        return eventRepository.findAll();
    }

    public Event findEventById(Long id) {
        return eventRepository.findEventById(id);
    }

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }


    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    public boolean deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
        return !eventRepository.existsById(eventId);
    }

}
