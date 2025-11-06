package com.example.eventmangementproject.dao.entities;

import jakarta.persistence.*;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private ZonedDateTime creationDate;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private boolean isPrivate = false;

    private boolean isVirtual = false;
    private String virtualLink;

    private long capacity; // null => illimité
    private boolean waitingListEnabled = false;
    private boolean requiresApproval = false;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToMany(mappedBy = "events")
    private List<Tag> tags;


}
