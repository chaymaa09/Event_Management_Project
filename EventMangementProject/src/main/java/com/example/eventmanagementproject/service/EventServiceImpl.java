package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;

import com.example.eventmanagementproject.dto.EventCreateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    @Override
    public Event addEvent(EventCreateDTO dto, String creatorEmail) {
        User creator = userRepository.findByEmail(creatorEmail)
                .orElseThrow(() -> new RuntimeException("User not found: " + creatorEmail));

        // Build event
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());

        if (dto.getStartDate() != null) {
            event.setStartDate(dto.getStartDate());
        }
        if (dto.getEndDate() != null) {
            event.setEndDate(dto.getEndDate());
        }

        event.setCreator(creator);
        event.setCapacity(dto.getCapacity());
        event.setIsPrivate(dto.getIsPrivate() != null ? dto.getIsPrivate() : false);
        event.setIsVirtual(dto.getIsVirtual() != null ? dto.getIsVirtual() : false);
        event.setVirtualLink(dto.getVirtualLink());
        event.setPrice(dto.getPrice() != null ? dto.getPrice() : 0.0);
        event.setCategory(dto.getCategory());
        event.setPosterUrl(dto.getPosterUrl());
        event.setWaitingListEnabled(false);
        event.setRequiresApproval(false);

        return eventRepository.save(event);
    }

    @Override
    public List<Event> findAllEvent() {
        return eventRepository.findAllWithTags();
    }

    @Override
    public Event findEventById(Long id) {
        return eventRepository.findEventById(id);
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