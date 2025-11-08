package com.example.eventmangementproject.service;

import com.example.eventmangementproject.dao.entities.Location;
import com.example.eventmangementproject.dao.repositories.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationServiceImpl implements LocationService {
    private final LocationRepository locationRepository;


    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + id));
    }

    @Override
    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location updateLocation(Location location) {
        if (location.getId() == null || !locationRepository.existsById(location.getId())) {
            throw new RuntimeException("Cannot update - Location not found");
        }
        return locationRepository.save(location);
    }

    @Override
    public boolean deleteLocation(Long id) {
        if (locationRepository.existsById(id)) {
            locationRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
