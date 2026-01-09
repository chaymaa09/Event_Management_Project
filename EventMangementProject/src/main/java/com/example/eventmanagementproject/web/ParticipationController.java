package com.example.eventmanagementproject.web;


import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dao.repositories.ParticipationRepository;
import com.example.eventmanagementproject.dto.ParticipationDTO;
import com.example.eventmanagementproject.service.ParticipationService;

import jakarta.validation.constraints.Null;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/participations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ParticipationController {

    private final ParticipationService participationService;
    private final EventRepository eventRepository;
    private final ParticipationRepository participationRepository;

    /**
     * Get all participations for a specific event (including CANCELLED)
     * GET /api/participations/event/{eventId}
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<ParticipationDTO>> getEventParticipations(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<Participation> participations = participationService.getEventParticipations(event);
        
        // Convert to DTOs to avoid circular reference
        List<ParticipationDTO> dtos = participations.stream()
                .map(ParticipationDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }

    /**
     * Get all participations for a specific event (excluding CANCELLED)
     * Sorted by: BLOCKED first, then others
     * GET /api/participations/event/{eventId}/active
     */
    @GetMapping("/event/{eventId}/active")
    public ResponseEntity<List<ParticipationDTO>> getEventParticipationsActive(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<Participation> participations = participationService.getEventParticipations(event);
        
        // Filter out CANCELLED and sort: BLOCKED -> others
        List<ParticipationDTO> dtos = participations.stream()
                .filter(p -> p.getStatus() != ParticipationStatus.CANCELLED)
                .sorted((p1, p2) -> {
                // BLOCKED first
                    if (p1.getStatus() == ParticipationStatus.BLOCKED) return -1;
                    if (p2.getStatus() == ParticipationStatus.BLOCKED) return 1;
                    // Others (priority 2)
                    return 0;
                })
                .map(ParticipationDTO::fromEntity)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(dtos);
    }

    /**
     * Get participation count for an event
     * GET /api/participations/event/{eventId}/count
     */
    @GetMapping("/event/{eventId}/joined")
    public List<User> getJoinedAttendees(@PathVariable Long eventId) {
        return participationService.getJoinedAttendees(eventId);

    }



    /**
     * Register user for an event
     * POST /api/participations/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerForEvent(
            @RequestParam Long userId,
            @RequestParam Long eventId) {
        try {
            Participation participation = participationService.registerForEvent(userId, eventId);
            return ResponseEntity.status(HttpStatus.CREATED).body(ParticipationDTO.fromEntity(participation));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * Cancel a participation
     * DELETE /api/participations/{participationId}
     */
    @DeleteMapping("/{participationId}")
    public ResponseEntity<?> cancelParticipation(@PathVariable Long participationId) {
        Boolean deleted = participationService.cancelParticipation(participationId);
        if (deleted) {
            return ResponseEntity.ok().body("Participation cancelled successfully");
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Update participation status
     * PUT /api/participations/{participationId}/status
     */
    @PutMapping("/{participationId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long participationId,
            @RequestParam ParticipationStatus status) {
        try {
            Participation updated = participationService.updateStatus(participationId, status);
            return ResponseEntity.ok(ParticipationDTO.fromEntity(updated));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("event/{eventId}/subscribers/")
    public List<User> getEventSubscribers(@PathVariable Long eventId) {
        return participationService.getEventSubscribers(eventId);
    }

    @PostMapping("event/{eventId}/request/{userId}")
    public Boolean requestToJoinEvent(@PathVariable Long eventId, @PathVariable Long userId){
        return participationService.sendRequestToJoin(eventId, userId);
    }

    @PostMapping("event/{eventId}/join/{userId}")
    public Boolean joinEvent(@PathVariable Long eventId, @PathVariable Long userId){
        return participationService.join(eventId, userId);
    }

    @GetMapping("/get/event/{eventId}/user/{userId}")
    public ResponseEntity<ParticipationDTO> getParticipation(@PathVariable Long eventId, @PathVariable Long userId){
        return participationRepository.findByEvent_idAndUser_id(eventId, userId)
                .map(p -> ResponseEntity.ok(ParticipationDTO.fromEntity(p)))
                .orElse(ResponseEntity.ok(null));
    }

    /**
     * Get all participations for a specific user
     * GET /api/participations/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ParticipationDTO>> getParticipationsByUser(@PathVariable Long userId) {
        List<Participation> participations = participationService.getUserParticipations(userId);
        List<ParticipationDTO> dtos = participations.stream()
                .map(ParticipationDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
}