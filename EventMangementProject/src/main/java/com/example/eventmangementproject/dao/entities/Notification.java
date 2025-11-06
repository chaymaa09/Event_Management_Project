package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}

