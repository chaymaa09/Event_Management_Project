package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event findEventById(Long id);
}
