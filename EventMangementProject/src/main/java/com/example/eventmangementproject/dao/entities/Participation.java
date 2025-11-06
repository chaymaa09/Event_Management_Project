package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ParticipationStatus status;

    private LocalDateTime createdAt = LocalDateTime.now();


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;


}
