package com.example.eventmanagementproject.dao.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

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
