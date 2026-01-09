package com.example.eventmanagementproject.dao.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.User;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByEvent(Event event);
    Optional<Participation> findByEventAndUser(Event event, User user);
    Optional<Participation> findByEvent_idAndUser_id(Long eventId, Long userId);

    boolean existsByEvent_idAndUser_id(Long eventId, Long userId);

    Long user(User user);
}
