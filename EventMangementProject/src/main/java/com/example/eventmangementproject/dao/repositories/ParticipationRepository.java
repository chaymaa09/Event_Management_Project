package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.dao.entities.Participation;
import com.example.eventmangementproject.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    List<Participation> findByEvent(Event event);
    Optional<Participation> findByEventAndUser(Event event, User user);
}
