package com.example.eventmanagementproject.dto;

import com.example.eventmanagementproject.dao.entities.Continent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CityDTO {
    private Integer id;
    private String name;
    private String logoUrl;
    private String imageUrl;
    private Continent continent;
    private Long eventCount;
}
