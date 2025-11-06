package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Participation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
}
