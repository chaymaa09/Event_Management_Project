package com.example.eventmanagementproject.dao.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({ "events" })
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String street;
    private String city;
    private String region; // état/province
    private String country;
    private String postalCode;

    private Double latitude;
    private Double longitude;

    private String timezone;
    private String placeId; // ID provider

    private String additionalInfos; // Comme num de buildings, other info

    @OneToMany(mappedBy = "location")
    private List<Event> events;
}
