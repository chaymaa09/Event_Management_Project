package com.example.eventmangementproject.web;

import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/events/all")
    public List<Event> getAllEvents() {
        return eventService.findAllEvent();
    }

    @GetMapping("/events/find")
    public Event getEventById(@RequestParam("id") Long id) {
        return eventService.findEventById(id);
    }

    @PostMapping("events/add")
    public Event addEvent(@RequestBody Event event) {
        return eventService.addEvent(event);
    }

    @PutMapping("/events/update")
    public Event updateEvent(@RequestBody Event event) {
        return eventService.updateEvent(event);
    }

    @DeleteMapping("/events/delete")
    public void deleteEventBId(@RequestParam("id") Long id) {
        eventService.deleteEvent(id);
    }
}
