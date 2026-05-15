package com.urbanoplus.occurrence.dto;

import com.urbanoplus.occurrence.model.OccurrenceCategory;
import com.urbanoplus.occurrence.model.OccurrenceStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
public class OccurrenceResponse {
    private Long id;
    private String title;
    private String description;
    private OccurrenceCategory category;
    private Double latitude;
    private Double longitude;
    private Double radius;
    private OccurrenceStatus status;
    private String rejectionReason;
    private LocalDateTime createdAt;
    private LocalDateTime expiresAt;
    private String userName;
    private List<String> photoUrls;
}
