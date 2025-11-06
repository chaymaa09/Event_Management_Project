package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
