package com.example.eventmanagementproject.service;

import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.dao.entities.Continent;
import com.example.eventmanagementproject.dao.repositories.CityRepository;
import com.example.eventmanagementproject.dto.CityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityRepository cityRepository;

    @Override
    public List<City> findCityOrderByEvent(String continent) {
        return cityRepository.findCityByContinent_Name(continent);
    }

    @Override
    public List<City> findByContinent(String continent) {
        return cityRepository.findByContinent_NameOrderByNameAsc(continent);
    }

    @Override
    public List<CityDTO> findCitiesWithEventCount(String continent) {
        List<Object[]> results = cityRepository.findCitiesWithEventCountByContinent(continent);
        return results.stream()
                .map(result -> {
                    Integer id = (Integer) result[0];
                    String name = (String) result[1];
                    String logoUrl = (String) result[2];
                    String imageUrl = (String) result[3];
                    Integer continentId = (Integer) result[4];
                    String continentName = (String) result[5];
                    Long eventCount = (Long) result[6];

                    // Create Continent object
                    Continent continentEntity = new Continent();
                    continentEntity.setId(continentId);
                    continentEntity.setName(continentName);

                    return new CityDTO(
                            id,
                            name,
                            logoUrl,
                            imageUrl,
                            continentEntity,
                            eventCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    public CityDTO findCityByNameWithEventCount(String cityName) {
        Object[] result = cityRepository.findCityWithEventCountByName(cityName);
        if (result == null) {
            return null;
        }

        Integer id = (Integer) result[0];
        String name = (String) result[1];
        String logoUrl = (String) result[2];
        String imageUrl = (String) result[3];
        Integer continentId = (Integer) result[4];
        String continentName = (String) result[5];
        Long eventCount = (Long) result[6];

        // Create Continent object
        Continent continentEntity = new Continent();
        continentEntity.setId(continentId);
        continentEntity.setName(continentName);

        return new CityDTO(
                id,
                name,
                logoUrl,
                imageUrl,
                continentEntity,
                eventCount);
    }
}
