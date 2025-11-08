package com.example.eventmanagementproject.service;
import com.example.eventmanagementproject.dao.entities.Location;

import java.util.List;

public interface LocationService {
    List<Location> getAllLocations();
    Location getLocationById(Long id);
    Location createLocation(Location location);
    Location updateLocation(Location location);
    boolean deleteLocation(Long id);
}
