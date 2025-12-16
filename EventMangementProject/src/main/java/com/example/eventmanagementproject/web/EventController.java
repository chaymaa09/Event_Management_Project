package com.example.eventmanagementproject.web;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dto.EventCreateDTO;
import com.example.eventmanagementproject.dto.EventResponseDTO;
import com.example.eventmanagementproject.mapper.EventMapper;
import com.example.eventmanagementproject.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;

    @GetMapping("/all")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        List<Event> events = eventService.findAllEvent();
        List<EventResponseDTO> dtos = events.stream()
                .map(eventMapper::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDTO> getEventById(@PathVariable Long id) {
        Event event = eventService.findEventById(id);
        return event != null
                ? ResponseEntity.ok(eventMapper.toResponseDTO(event))
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(
            @RequestBody Event event,
            @AuthenticationPrincipal UserDetails userDetails) {

        String creatorEmail = (userDetails != null)
                ? userDetails.getUsername()
                : "alice@example.com";

        // Create DTO from Event entity
        EventCreateDTO dto = new EventCreateDTO();
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setStartDate(event.getStartDate());
        dto.setEndDate(event.getEndDate());
        dto.setCapacity(event.getCapacity());
        dto.setIsPrivate(event.getIsPrivate());
        dto.setIsVirtual(event.getIsVirtual());
        dto.setVirtualLink(event.getVirtualLink());
        dto.setPrice(event.getPrice());
        dto.setCategory(event.getCategory());
        dto.setPosterUrl(event.getPosterUrl());

        // Extract IDs from nested objects
        if (event.getLocation() != null) {
            dto.setLocationId(event.getLocation().getId());
        }
        if (event.getTags() != null && !event.getTags().isEmpty()) {
            dto.setTagIds(event.getTags().stream()
                    .map(tag -> tag.getId())
                    .collect(java.util.stream.Collectors.toSet()));
        }

        Event savedEvent = eventService.addEvent(dto, creatorEmail);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    @PutMapping("/update")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteEventBId(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.deleteEvent(id));
    }

}
