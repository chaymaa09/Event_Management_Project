package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Location;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.CategoryRepository;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dao.repositories.LocationRepository;
import com.example.eventmanagementproject.dao.repositories.CityRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;

import com.example.eventmanagementproject.dto.EventCreateDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final CityRepository cityRepository;
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
        // pricing removed: events are free

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

            if (locDto.getCity() != null && !locDto.getCity().isBlank()) {
                cityRepository.findByNameIgnoreCase(locDto.getCity().trim())
                        .ifPresent(event::setCity);
            }
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
    public Event updateEvent(Long id, EventCreateDTO dto) {
        Event existing = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found: " + id));

        if (dto.getTitle() != null) existing.setTitle(dto.getTitle());
        if (dto.getDescription() != null) existing.setDescription(dto.getDescription());
        if (dto.getStartDate() != null) existing.setStartDate(dto.getStartDate());
        if (dto.getEndDate() != null) existing.setEndDate(dto.getEndDate());

        existing.setIsVirtual(dto.getIsVirtual() != null ? dto.getIsVirtual() : existing.getIsVirtual());
        existing.setVirtualLink(dto.getVirtualLink() != null ? dto.getVirtualLink() : existing.getVirtualLink());
        existing.setCapacity(dto.getCapacity() != null ? dto.getCapacity() : existing.getCapacity());
        existing.setWaitingListEnabled(dto.getWaitingListEnabled() != null ? dto.getWaitingListEnabled() : existing.getWaitingListEnabled());
        existing.setRequiresApproval(dto.getRequiresApproval() != null ? dto.getRequiresApproval() : existing.getRequiresApproval());
        // pricing removed
        existing.setPosterUrl(dto.getPosterUrl() != null ? dto.getPosterUrl() : existing.getPosterUrl());
        Category cat = categoryRepository.findById(dto.getCategoryId()).orElse(null);
        existing.setCategory(dto.getCategoryId() != null ? cat : existing.getCategory());



        // Location handling: update or set existing
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
            existing.setLocation(location);
        } else if (dto.getLocationId() != null) {
            locationRepository.findById(dto.getLocationId())
                    .ifPresent(existing::setLocation);
        }

        return eventRepository.save(existing);
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
    public List<Event> findEventsByCity(String cityName) {
        return eventRepository.findByCityOrLocationCityIgnoreCase(cityName);
    }

    @Override
    public List<Event> findEventsByCategoryAndLocation(String categoryName, String city, String country) {
        if (city != null && !city.isBlank() && country != null && !country.isBlank()) {
            return eventRepository.findByCategory_NameAndLocation_CityAndLocation_Country(categoryName, city, country);
        } else if (city != null && !city.isBlank()) {
            List<Event> events = eventRepository.findByCategory_Name(categoryName);
            return events.stream()
                    .filter(e -> e.getLocation() != null && city.equalsIgnoreCase(e.getLocation().getCity()))
                    .toList();
        }
        return eventRepository.findByCategory_Name(categoryName);
    }

    @Override
    public List<Event> findNearbyEvents(Double lat, Double lng, Double radiusKm, String categoryName) {
        List<Event> events;
        if (categoryName != null && !categoryName.isBlank()) {
            events = eventRepository.findByCategory_Name(categoryName);
        } else {
            events = eventRepository.findAllWithLocationCoordinates();
        }

        return events.stream()
                .filter(e -> e.getLocation() != null && e.getLocation().getLatitude() != null
                        && e.getLocation().getLongitude() != null)
                .filter(e -> calculateDistance(lat, lng, e.getLocation().getLatitude(),
                        e.getLocation().getLongitude()) <= radiusKm)
                .toList();
    }

    private double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Radius of the earth in km
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                        * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // distance in km
    }

    @Override
    public List<Event> findEventByCreator(Long id) {
        if (userRepository.existsById(id) && eventRepository.findByCreator_id(id) != null) {
            return eventRepository.findByCreator_id(id);
        }
        return new ArrayList<>();
    }

}