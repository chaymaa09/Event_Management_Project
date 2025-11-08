package com.example.eventmangementproject.service;

import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.dao.entities.Participation;
import com.example.eventmangementproject.dao.entities.ParticipationStatus;

import java.util.List;

public interface ParticipationService {
    List<Participation> getEventParticipations(Event event);
    Boolean cancelParticipation(Long participationId);
    Participation registerForEvent(Long userId, Long eventId);
    Participation updateStatus(Long participationId, ParticipationStatus newStatus);
}
