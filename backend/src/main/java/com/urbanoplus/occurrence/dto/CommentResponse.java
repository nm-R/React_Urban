package com.urbanoplus.occurrence.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter
public class CommentResponse {
    private Long id;
    private String text;
    private String userName;
    private LocalDateTime createdAt;
}
