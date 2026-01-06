package com.example.eventmanagementproject.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String logoUrl;
    private String imageUrl;

    @ManyToOne
    private Continent continent;

    @OneToMany(mappedBy = "city")
    @JsonIgnore
    private List<Event> events;
}
