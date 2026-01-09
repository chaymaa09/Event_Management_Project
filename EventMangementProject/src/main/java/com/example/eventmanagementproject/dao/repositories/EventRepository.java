package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.Category;
import com.example.eventmanagementproject.dao.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    Event findEventById(Long id);

    @Query("SELECT DISTINCT e FROM Event e LEFT JOIN FETCH e.tags LEFT JOIN FETCH e.creator LEFT JOIN FETCH e.location")
    List<Event> findAllWithTags();

    List<Event> findByCategory_Name(String categoryName);

    List<Event> findByLocation_City(String cityName);

    // Find events by category name and exact location city + country
    List<Event> findByCategory_NameAndLocation_CityAndLocation_Country(String categoryName, String city,
            String country);

    // Find events that have a location set (for server-side filtering)
    @Query("SELECT DISTINCT e FROM Event e LEFT JOIN FETCH e.tags LEFT JOIN FETCH e.creator LEFT JOIN FETCH e.location l WHERE l.latitude IS NOT NULL AND l.longitude IS NOT NULL")
    List<Event> findAllWithLocationCoordinates();

    List<Event> findByCreator_id(Long Id);
}
