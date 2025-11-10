package com.example.eventmanagementproject.web;

import com.example.eventmanagementproject.dao.entities.Location;
import com.example.eventmanagementproject.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor

public class LocationController {

    private final LocationService locationService;

    @GetMapping("/all")
    public ResponseEntity<List<Location>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Location> getLocationById(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getLocationById(id));
    }

    @PostMapping("/add")
    public ResponseEntity<Location> addLocation(@RequestBody Location location) {

        return ResponseEntity.ok(locationService.createLocation(location));

    }

    @PutMapping("/update")
    public ResponseEntity<Location> updateLocation(@RequestBody Location location) {
        return ResponseEntity.ok(locationService.updateLocation(location));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteLocation(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.deleteLocation(id));
    }

}
