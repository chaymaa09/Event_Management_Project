package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.dto.CityDTO;

import java.util.List;

public interface CityService {
    public List<City> findCityOrderByEvent(String country);

    public List<City> findByContinent(String continent);

    public List<CityDTO> findCitiesWithEventCount(String continent);

    public CityDTO findCityByNameWithEventCount(String cityName);
}
