package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

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
