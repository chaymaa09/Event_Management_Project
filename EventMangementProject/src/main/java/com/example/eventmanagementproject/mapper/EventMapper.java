package com.example.eventmanagementproject.mapper;

import com.example.eventmanagementproject.dao.entities.Event;
import com.example.eventmanagementproject.dao.entities.Tag;
import com.example.eventmanagementproject.dto.EventResponseDTO;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class EventMapper {

    public EventResponseDTO toResponseDTO(Event event) {
        if (event == null) {
            return null;
        }

        EventResponseDTO dto = new EventResponseDTO();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setStartDate(event.getStartDate());
        dto.setEndDate(event.getEndDate());
        dto.setCapacity(event.getCapacity());
        dto.setIsPrivate(event.getIsPrivate());
        dto.setIsVirtual(event.getIsVirtual());
        dto.setVirtualLink(event.getVirtualLink());
        dto.setWaitingListEnabled(event.getWaitingListEnabled());
        dto.setRequiresApproval(event.getRequiresApproval());
        // pricing removed
        dto.setCategory(event.getCategory() != null ? event.getCategory().getName() : null);
        dto.setPosterUrl(event.getPosterUrl());
        dto.setCreationDate(event.getCreationDate());
        // Map creator (avoid lazy loading issues)
        if (event.getCreator() != null) {
            EventResponseDTO.UserBasicDTO userDTO = new EventResponseDTO.UserBasicDTO();
            userDTO.setId(event.getCreator().getId());
            userDTO.setName(event.getCreator().getName());
            userDTO.setEmail(event.getCreator().getEmail());
            userDTO.setAvatarUrl(event.getCreator().getAvatarUrl());
            dto.setCreator(userDTO);
        }

        // Map location (avoid lazy loading issues)
        if (event.getLocation() != null) {
            EventResponseDTO.LocationDTO locationDTO = new EventResponseDTO.LocationDTO();
            locationDTO.setId(event.getLocation().getId());
            locationDTO.setName(event.getLocation().getName());
            locationDTO.setStreet(event.getLocation().getStreet());
            locationDTO.setCity(event.getLocation().getCity());
            locationDTO.setRegion(event.getLocation().getRegion());
            locationDTO.setCountry(event.getLocation().getCountry());
            locationDTO.setPostalCode(event.getLocation().getPostalCode());
            locationDTO.setLatitude(event.getLocation().getLatitude());
            locationDTO.setLongitude(event.getLocation().getLongitude());
            dto.setLocation(locationDTO);
        }

        // Map tags
        if (event.getTags() != null && !event.getTags().isEmpty()) {
            dto.setTags(event.getTags().stream()
                    .map(tag -> {
                        EventResponseDTO.TagDTO tagDTO = new EventResponseDTO.TagDTO();
                        tagDTO.setId(tag.getId());
                        tagDTO.setName(tag.getTagName());
                        return tagDTO;
                    })
                    .collect(Collectors.toSet()));
        }

        return dto;
    }
}
