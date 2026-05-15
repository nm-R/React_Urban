package com.urbanoplus.occurrence.dto;

import com.urbanoplus.occurrence.model.OccurrenceCategory;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class OccurrenceRequest {
    private String title;
    private String description;
    private OccurrenceCategory category;
    private Double latitude;
    private Double longitude;
    private Double radius;
}
