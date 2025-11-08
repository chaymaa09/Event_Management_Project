package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event findEventById(Long id);
}
