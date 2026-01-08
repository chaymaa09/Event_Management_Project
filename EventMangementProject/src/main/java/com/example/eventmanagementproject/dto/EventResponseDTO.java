package com.example.eventmanagementproject.dto;

import lombok.Data;
import java.time.ZonedDateTime;
import java.util.Set;

@Data
public class EventResponseDTO {
    private Long id;
    private String title;
    private String description;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private Long capacity;
    private Boolean isPrivate;
    private Boolean isVirtual;
    private String virtualLink;
    private Boolean waitingListEnabled;
    private Boolean requiresApproval;
    private Double price;
    private String currency;
    private String category;
    private String posterUrl;
    private ZonedDateTime creationDate;

    // Creator info (minimal to avoid lazy loading)
    private UserBasicDTO creator;

    // Location info (minimal)
    private LocationDTO location;

    // Tags
    private Set<TagDTO> tags;

    // Nested DTOs
    @Data
    public static class UserBasicDTO {
        private Long id;
        private String name;
        private String email;
        private String avatarUrl;
    }

    @Data
    public static class LocationDTO {
        private Long id;
        private String name;
        private String street;
        private String city;
        private String region;
        private String country;
        private String postalCode;
        private Double latitude;
        private Double longitude;
    }

    @Data
    public static class TagDTO {
        private Long id;
        private String name;
    }
}
