package com.example.eventmanagementproject.web;

import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.dto.CityDTO;
import com.example.eventmanagementproject.service.CityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityServiceImpl cityServiceImpl;

    @GetMapping("/order/{continent}")
    public List<City> findCitiesByContinentOrderByEvent(@PathVariable String continent) {
        return cityServiceImpl.findCityOrderByEvent(continent);
    }

    @GetMapping("/name/{cityName}")
    public CityDTO findByName(@PathVariable String cityName) {
        System.out.println("Fetching city by name: " + cityName);
        return cityServiceImpl.findCityByNameWithEventCount(cityName);
    }

    @GetMapping("/{continent}")
    public List<CityDTO> findByContinent(@PathVariable String continent) {
        System.out.println("Fetching cities for continent: " + continent);
        // Return cities for the given continent with event counts
        return cityServiceImpl.findCitiesWithEventCount(continent);
    }

}
