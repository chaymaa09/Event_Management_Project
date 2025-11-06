package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    @Override
    public List<Event> findAllEvent() {
        return eventRepository.findAll();
    }

    @Override
    public Event findEventById(Long id) {
        return eventRepository.findEventById(id);
    }

    @Override
    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public boolean deleteEvent(Long eventId) {

        if (eventRepository.existsById(eventId)) {
            eventRepository.deleteById(eventId);
            return true;
        }
        return false;
    }
}