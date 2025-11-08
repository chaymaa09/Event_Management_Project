package com.example.eventmangementproject.web;

import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.service.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {
    @Autowired
    private EventServiceImpl eventServiceImpl;

    @GetMapping("/events/all")
    public List<Event> getAllEvents() {
        return eventServiceImpl.findAllEvent();
    }

    @GetMapping("/events/find")
    public Event getEventById(@RequestParam("id") Long id) {
        return eventServiceImpl.findEventById(id);
    }

    @PostMapping("events/add")
    public Event addEvent(@RequestBody Event event) {
        return eventServiceImpl.addEvent(event);
    }

    @PutMapping("/events/update")
    public Event updateEvent(@RequestBody Event event) {
        return eventServiceImpl.updateEvent(event);
    }

    @DeleteMapping("/events/delete")
    public void deleteEventBId(@RequestParam("id") Long id) {
        eventServiceImpl.deleteEvent(id);
    }
}
