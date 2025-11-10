package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import com.example.eventmanagementproject.dao.entities.User;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.repositories.ParticipationRepository;
import com.example.eventmanagementproject.dao.repositories.UserRepository;
import com.example.eventmanagementproject.dao.repositories.EventRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipationServiceImpl implements ParticipationService {
    private final ParticipationRepository participationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;


    @Override
    public List<Participation> getEventParticipations(Event event) {
        return participationRepository.findByEvent(event);
    }

    @Override
    public Boolean cancelParticipation(Long participationId) {
        if (participationRepository.existsById(participationId)) {
            participationRepository.deleteById(participationId);
            return true;
        }
        return false;
    }

    @Override
    public Participation registerForEvent(Long userId, Long eventId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found with id: " + eventId));
        Optional<Participation> existingRegistration = participationRepository.findByEventAndUser(event, user);
        if (existingRegistration.isPresent()) {
            throw new RuntimeException("User is already registered for this event!");
        }
        Participation participation = new Participation();

        participation.setUser(user);
        participation.setEvent(event);
        participation.setRegistrationDate(ZonedDateTime.now());
        participation.setStatus(ParticipationStatus.PENDING);


        return participationRepository.save(participation);
    }

    @Override
    public Participation updateStatus(Long participationId, ParticipationStatus newStatus) {
        Participation participation = participationRepository.findById(participationId)
                .orElseThrow(() -> new RuntimeException("Participation not found with id: " + participationId));

        validateStatusTransition(participation.getStatus(), newStatus);
        participation.setStatus(newStatus);
        return participationRepository.save(participation);
    }

    public void validateStatusTransition(ParticipationStatus currentStatus, ParticipationStatus newStatus) {
        if (currentStatus == ParticipationStatus.CANCELLED && newStatus == ParticipationStatus.CONFIRMED) {
            throw new RuntimeException("Cannot confirm a cancelled participation");
        }

        if (currentStatus == ParticipationStatus.ATTENDED && newStatus == ParticipationStatus.PENDING) {
            throw new RuntimeException("Cannot change attended participation back to pending");
        }

        // can add more transition rules here
    }
}
