package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import com.example.eventmanagementproject.dao.entities.User;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ParticipationService {
    List<Participation> getEventParticipations(Event event);
    Boolean cancelParticipation(Long participationId);
    Participation registerForEvent(Long userId, Long eventId);
    Participation updateStatus(Long participationId, ParticipationStatus newStatus);
    List<User> getEventSubscribers(Long eventId);
    List<User> getJoinedAttendees(Long eventId);
    Boolean sendRequestToJoin(Long eventId, Long userId);
    Boolean join(Long eventId, Long userId);
    Participation createParticipation(Event event, User user, ParticipationStatus status);

    }
