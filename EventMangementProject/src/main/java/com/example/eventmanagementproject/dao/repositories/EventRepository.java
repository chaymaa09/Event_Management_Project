package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event findEventById(Long id);

    @Query("SELECT DISTINCT e FROM Event e LEFT JOIN FETCH e.tags LEFT JOIN FETCH e.creator LEFT JOIN FETCH e.location")
    List<Event> findAllWithTags();
}
