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

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "creation_date", insertable = false, updatable = false)
    private ZonedDateTime creationDate;

    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "is_private", nullable = false)
    private Boolean isPrivate = false;

    @Column(name = "is_virtual", nullable = false)
    private Boolean isVirtual = false;

    @Column(name = "virtual_link", length = 500)
    private String virtualLink;

    private Long capacity;

    @Column(name = "waiting_list_enabled", nullable = false)
    private Boolean waitingListEnabled = false;

    @Column(name = "requires_approval", nullable = false)
    private Boolean requiresApproval = false;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @Column(nullable = false)
    private Double price = 0.0;

    @Column(length = 50)
    private String category; // Or use @Enumerated(EnumType.STRING) with an enum

    @Column(name = "poster_url", length = 500)
    private String posterUrl;

    // For attendees count, Add a computed field based on Participation count
    @Transient // if computed from participations
    private Integer attendees;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tag_events", // Junction table name
            joinColumns = @JoinColumn(name = "event_id"), // Column for Event
            inverseJoinColumns = @JoinColumn(name = "tag_id") // Column for Tag
    )
    private List<Tag> tags;

}
