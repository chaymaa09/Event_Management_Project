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

import java.util.ArrayList;
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

    @Override
    public List<Event> findEventsByCategoryAndLocation(String categoryName, String city, String country) {
        if (city != null && country != null) {
            List<Event> byLocation = eventRepository.findByCategory_NameAndLocation_CityAndLocation_Country(categoryName, city, country);
            if (byLocation != null && !byLocation.isEmpty()) {
                return byLocation;
            }
        }
        // Fallback: return all events in the category
        return findEventsByCategory(categoryName);
    }

    @Override
    public List<Event> findNearbyEvents(Double lat, Double lng, Double radiusKm, String categoryName) {
        // If categoryName provided, start from category set, otherwise take all with coordinates
        List<Event> candidates;
        if (categoryName != null && !categoryName.isBlank()) {
            candidates = eventRepository.findByCategory_Name(categoryName);
        } else {
            candidates = eventRepository.findAllWithLocationCoordinates();
        }

        if (lat == null || lng == null || radiusKm == null) {
            return candidates;
        }

        double r = radiusKm.doubleValue();
        return candidates.stream()
                .filter(e -> e.getLocation() != null && e.getLocation().getLatitude() != null && e.getLocation().getLongitude() != null)
                .filter(e -> {
                    double d = haversineDistanceKm(lat, lng, e.getLocation().getLatitude(), e.getLocation().getLongitude());
                    return d <= r;
                })
                .toList();
    }

    // Haversine formula
    private static double haversineDistanceKm(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c;
        return distance;
    }

    @Override
    public List<Event> findEventByCreator(Long id) {
        if (userRepository.existsById(id) && eventRepository.findByCreator_id(id) != null) {
            return eventRepository.findByCreator_id(id);
        }
        return new ArrayList<>();
    }

}