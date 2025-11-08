package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);
    Optional<Tag> findByTagNameIgnoreCase(String tagName);
}
