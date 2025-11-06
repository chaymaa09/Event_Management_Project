package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String street;
    private String city;
    private String region;       // état/province
    private String country;
    private String postalCode;

    private Double latitude;
    private Double longitude;

    private String timezone;
    private String placeId;      // ID provider

    private String additionalInfos;   // Comme num de buildings, other info


    @OneToMany(mappedBy = "location")
    private List<Event> events;
}
