package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Location;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.CategoryRepository;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dao.repositories.LocationRepository;
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
    private final LocationRepository locationRepository;
    private final CategoryRepository categoryRepository;

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
        event.setWaitingListEnabled(dto.getWaitingListEnabled() != null ? dto.getWaitingListEnabled() : false);
        event.setRequiresApproval(dto.getRequiresApproval() != null ? dto.getRequiresApproval() : false);
        event.setPrice(dto.getPrice() != null ? dto.getPrice() : 0.0);
        event.setCurrency(dto.getCurrency() != null ? dto.getCurrency() : "USD");

        // Directly map the incoming category string to an existing Category entity
        if (dto.getCategory() != null && !dto.getCategory().isBlank()) {
            String code = dto.getCategory().trim().toUpperCase();

            Category category = categoryRepository
                    .findByNameIgnoreCase(code)
                    .orElseThrow(() -> new RuntimeException("Category not found: " + code));

            event.setCategory(category);
        }
        event.setPosterUrl(dto.getPosterUrl());

        // Handle location - create new or use existing
        if (dto.getLocation() != null && !dto.getIsVirtual()) {
            EventCreateDTO.LocationCreateDTO locDto = dto.getLocation();
            Location location = new Location();
            location.setName(locDto.getName());
            location.setStreet(locDto.getStreet());
            location.setCity(locDto.getCity());
            location.setRegion(locDto.getRegion());
            location.setCountry(locDto.getCountry());
            location.setPostalCode(locDto.getPostalCode());
            location.setLatitude(locDto.getLatitude());
            location.setLongitude(locDto.getLongitude());
            location.setTimezone(locDto.getTimezone());
            location.setAdditionalInfos(locDto.getAdditionalInfos());
            location = locationRepository.save(location);
            event.setLocation(location);
        } else if (dto.getLocationId() != null) {
            locationRepository.findById(dto.getLocationId())
                .ifPresent(event::setLocation);
        }

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

    public List<Event> findEventsByCategory(String categoryName) {
        return eventRepository.findByCategory_Name(categoryName);
    }

}