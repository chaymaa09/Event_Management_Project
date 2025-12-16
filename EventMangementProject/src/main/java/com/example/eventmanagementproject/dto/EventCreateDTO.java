package com.example.eventmanagementproject.dto;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EventCreateDTO {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Start date is required")
    private ZonedDateTime startDate;

    private ZonedDateTime endDate;

    private Long capacity;

    private Boolean isPrivate = false;
    private Boolean isVirtual = false;
    private String virtualLink;

    private Double price = 0.0;
    private String category;
    private String posterUrl;

    private Long locationId; // Optional

    private Set<Long> tagIds = new HashSet<>(); // Optional
}
