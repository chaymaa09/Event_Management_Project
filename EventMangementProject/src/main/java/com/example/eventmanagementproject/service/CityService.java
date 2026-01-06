package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.City;

import java.util.List;

public interface CityService {
    public List<City> findCityOrderByEvent(String country);
    public List<City> findByContinent(String continent);
}
