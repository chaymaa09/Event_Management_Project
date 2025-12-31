package com.example.eventmanagementproject.dto;

import com.example.eventmanagementproject.dao.entities.Participation;
import com.example.eventmanagementproject.dao.entities.ParticipationStatus;
import lombok.*;

import java.time.ZonedDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userAvatarUrl;
    private Long eventId;
    private String eventTitle;
    private ParticipationStatus status;
    private ZonedDateTime registrationDate;

    public static ParticipationDTO fromEntity(Participation p) {
        ParticipationDTO dto = new ParticipationDTO();
        dto.setId(p.getId());
        dto.setStatus(p.getStatus());
        dto.setRegistrationDate(p.getRegistrationDate());
        
        if (p.getUser() != null) {
            dto.setUserId(p.getUser().getId());
            dto.setUserName(p.getUser().getName());
            dto.setUserEmail(p.getUser().getEmail());
            dto.setUserAvatarUrl(p.getUser().getAvatarUrl());
        }
        
        if (p.getEvent() != null) {
            dto.setEventId(p.getEvent().getId());
            dto.setEventTitle(p.getEvent().getTitle());
        }
        
        return dto;
    }
}