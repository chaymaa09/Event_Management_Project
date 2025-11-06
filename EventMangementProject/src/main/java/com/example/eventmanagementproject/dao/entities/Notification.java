package com.example.eventmanagementproject.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;


@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean read;
    private String message;
    private ZonedDateTime createdAt = ZonedDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


}

