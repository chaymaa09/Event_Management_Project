package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String password;
    private String authType; // LOCAL ou OAUTH

    private String provider;
    private String providerId;
    private String avatarUrl;

    @OneToMany(mappedBy = "creator")
    private List<Event> createdEvents;

    @OneToMany(mappedBy = "user")
    private List<Participation> participations;

}
