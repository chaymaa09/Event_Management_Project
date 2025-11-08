package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;

import java.util.List;

public interface ParticipationService {
    List<Participation> getEventParticipations(Event event);
    Boolean cancelParticipation(Long participationId);
    Participation registerForEvent(Long userId, Long eventId);
    Participation updateStatus(Long participationId, ParticipationStatus newStatus);
}
