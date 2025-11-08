package com.example.eventmangementproject.web;

<<<<<<< HEAD:EventMangementProject/src/main/java/com/example/eventmanagementproject/web/EventController.java
import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
=======
import com.example.eventmangementproject.dao.entities.Event;
import com.example.eventmangementproject.service.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> 2b6492f7f7f753c3f8fa7802786b7b2d6f564679:EventMangementProject/src/main/java/com/example/eventmangementproject/web/EventController.java
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping("/all")
    public ResponseEntity<List<Event>> getAllEvents() {

        return ResponseEntity.ok(eventService.findAllEvent());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.findEventById(id);
        return event != null ? ResponseEntity.ok(event) : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.addEvent(event));
    }

    @PutMapping("/update")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteEventBId(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.deleteEvent(id));
    }
}
