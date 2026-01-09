package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CityRepository extends JpaRepository<City, Integer> {
        List<City> findCityByContinent_Name(String continent);

        @Query("""
                        SELECT c FROM City c LEFT JOIN c.events e WHERE c.continent = :continent GROUP BY c.id ORDER BY COUNT(e) DESC
                        """)
        List<City> findCitiesOrderByEventCount(@Param("continent") String continent);

        List<City> findByContinent_NameOrderByNameAsc(String continentName);

        @Query("""
                        SELECT c.id, c.name, c.logoUrl, c.imageUrl, c.continent.id, c.continent.name, COUNT(e)
                        FROM City c
                        LEFT JOIN c.events e
                        WHERE c.continent.name = :continentName
                        GROUP BY c.id, c.name, c.logoUrl, c.imageUrl, c.continent.id, c.continent.name
                        ORDER BY c.name ASC
                        """)
        List<Object[]> findCitiesWithEventCountByContinent(@Param("continentName") String continentName);

        @Query("""
                        SELECT c.id, c.name, c.logoUrl, c.imageUrl, c.continent.id, c.continent.name, COUNT(e)
                        FROM City c
                        LEFT JOIN c.events e
                        WHERE c.name = :cityName
                        GROUP BY c.id, c.name, c.logoUrl, c.imageUrl, c.continent.id, c.continent.name
                        """)
        Object[] findCityWithEventCountByName(@Param("cityName") String cityName);
}
