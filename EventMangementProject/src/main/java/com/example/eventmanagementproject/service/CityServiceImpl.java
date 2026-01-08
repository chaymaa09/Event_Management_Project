package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.dao.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<City> findCityOrderByEvent(String continent){
        return cityRepository.findCityByContinent_Name(continent);
    }

    @Override
    public List<City> findByContinent(String continent){
        return cityRepository.findByContinent_NameOrderByNameAsc(continent);
    }
}
