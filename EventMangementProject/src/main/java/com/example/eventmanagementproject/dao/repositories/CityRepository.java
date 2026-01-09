package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.City;
import com.example.eventmanagementproject.dto.CityDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Integer> {
        List<City> findCityByContinent_Name(String continent);

        @Query("""
                        SELECT c FROM City c LEFT JOIN c.events e WHERE c.continent.name = :continent GROUP BY c.id ORDER BY COUNT(e) DESC
                        """)
        List<City> findCitiesOrderByEventCount(@Param("continent") String continent);

        List<City> findByContinent_NameOrderByNameAsc(String continentName);

        @Query("""
                        SELECT new com.example.eventmanagementproject.dto.CityDTO(
                                c.id,
                                c.name,
                                c.logoUrl,
                                c.imageUrl,
                                c.continent,
                                COUNT(e)
                        )
                        FROM City c
                        LEFT JOIN Event e ON (e.city = c OR LOWER(e.location.city) = LOWER(c.name))
                        WHERE c.continent.name = :continentName
                        GROUP BY c.id, c.name, c.logoUrl, c.imageUrl, c.continent
                        ORDER BY c.name ASC
                        """)
        List<CityDTO> findCitiesWithEventCountByContinent(@Param("continentName") String continentName);

        @Query("""
                        SELECT new com.example.eventmanagementproject.dto.CityDTO(
                                c.id,
                                c.name,
                                c.logoUrl,
                                c.imageUrl,
                                c.continent,
                                COUNT(e)
                        )
                        FROM City c
                        LEFT JOIN Event e ON (e.city = c OR LOWER(e.location.city) = LOWER(c.name))
                        WHERE LOWER(c.name) = LOWER(:cityName)
                        GROUP BY c.id, c.name, c.logoUrl, c.imageUrl, c.continent
                        """)
        CityDTO findCityWithEventCountByName(@Param("cityName") String cityName);

        Optional<City> findByNameIgnoreCase(String name);
}
