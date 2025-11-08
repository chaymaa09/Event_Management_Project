package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isRead;
    private String message;
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}

