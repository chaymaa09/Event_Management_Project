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
    private Boolean waitingListEnabled = false;
    private Boolean requiresApproval = false;

    private Double price = 0.0;
    private String currency = "USD";
    private String category;
    private String posterUrl;

    private Long locationId; // Optional
    
    // Location details for creating new location
    private LocationCreateDTO location;

    private Set<Long> tagIds = new HashSet<>(); // Optional
    
    @Data
    public static class LocationCreateDTO {
        private String name;
        private String street;
        private String city;
        private String region;
        private String country;
        private String postalCode;
        private Double latitude;
        private Double longitude;
        private String timezone;
        private String additionalInfos;
    }
}
