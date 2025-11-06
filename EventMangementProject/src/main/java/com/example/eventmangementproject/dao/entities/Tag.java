package com.example.eventmangementproject.dao.entities;

import com.example.eventmangementproject.dao.entities.Event;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tagName;

    @ManyToMany(mappedBy = "tags")
    private List<Event> events ;
}

