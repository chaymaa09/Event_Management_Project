package com.example.eventmanagementproject.web;


import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import com.example.eventmanagementproject.dao.repositories.EventRepository;
import com.example.eventmanagementproject.dto.ParticipationDTO;
import com.example.eventmanagementproject.service.ParticipationService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participations")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ParticipationController {

    private final ParticipationService participationService;
    private final EventRepository eventRepository;

    /**
     * Get all participations for a specific event
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
     * Get participation count for an event
     * GET /api/participations/event/{eventId}/count
     */
    @GetMapping("/event/{eventId}/count")
    public ResponseEntity<Long> getParticipationCount(@PathVariable Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);
        
        if (event == null) {
            return ResponseEntity.notFound().build();
        }
        
        List<Participation> participations = participationService.getEventParticipations(event);
        long confirmedCount = participations.stream()
                .filter(p -> p.getStatus() == ParticipationStatus.CONFIRMED || 
                            p.getStatus() == ParticipationStatus.ATTENDED)
                .count();
        
        return ResponseEntity.ok(confirmedCount);
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
}