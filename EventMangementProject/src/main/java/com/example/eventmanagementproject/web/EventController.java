package com.example.eventmanagementproject.web;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Location;
import com.example.eventmanagementproject.dto.EventCreateDTO;
import com.example.eventmanagementproject.dto.EventResponseDTO;
import com.example.eventmanagementproject.mapper.EventMapper;
import com.example.eventmanagementproject.service.EventService;
import com.example.eventmanagementproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventMapper eventMapper;
    private final UserService userService;

    @Value("${app.upload.dir:${user.dir}/assets/userUploads}")
    private String uploadDir;

    @GetMapping("/all")
    public ResponseEntity<List<EventResponseDTO>> getAllEvents() {
        List<Event> events = eventService.findAllEvent();
        List<EventResponseDTO> dtos = events.stream()
                .map(eventMapper::toResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDTO> getEventById(@PathVariable Long id) {
        Event event = eventService.findEventById(id);
        return event != null
                ? ResponseEntity.ok(eventMapper.toResponseDTO(event))
                : ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Event> addEvent(
            @RequestBody EventCreateDTO dto,
            @AuthenticationPrincipal Jwt jwt) {

        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        var creator = userService.ensureUserExists(jwt);
        String creatorEmail = creator.getEmail();

        Event savedEvent = eventService.addEvent(dto, creatorEmail);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedEvent);
    }

    @PutMapping("/update")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        return ResponseEntity.ok(eventService.updateEvent(event));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteEventBId(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.deleteEvent(id));
    }

    @PostMapping("/upload-poster")
    public ResponseEntity<Map<String, String>> uploadPoster(@RequestParam("poster") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "No file provided"));
        }

        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir, "posters");
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf(".")) 
                : ".jpg";
            String filename = UUID.randomUUID().toString() + extension;

            // Save file
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath);

            // Return relative URL (without base URL)
            String posterUrl = "/assets/userUploads/posters/" + filename;
            return ResponseEntity.ok(Map.of("posterUrl", posterUrl));

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
        }
    }

}
