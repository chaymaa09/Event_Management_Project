package com.example.eventmanagementproject.web;


import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.service.CityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityServiceImpl cityServiceImpl;

    @PostMapping("order/{continent}")
    public List<City> findCitiesByContinentOrderByEvent(@PathVariable String continent){
        return cityServiceImpl.findCityOrderByEvent(continent);
    }

    @PostMapping("/{continent}")
    public List<City> findByContinent(@PathVariable String continent){
        System.out.println(continent);
        // Return cities for the given continent ordered alphabetically by city name
        return cityServiceImpl.findByContinent(continent);
    }



}
