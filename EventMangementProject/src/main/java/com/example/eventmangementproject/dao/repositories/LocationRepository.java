package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {

}
