package com.urbanoplus.occurrence.model;

import com.urbanoplus.auth.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "occurrences")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Occurrence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @Enumerated(EnumType.STRING)
    private OccurrenceCategory category;

    private Double latitude;

    private Double longitude;

    private Double radius;

    @Enumerated(EnumType.STRING)
    private OccurrenceStatus status = OccurrenceStatus.PENDING;

    private String rejectionReason;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime approvedAt;

    private LocalDateTime expiresAt;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "occurrence", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Photo> photos;

    @OneToMany(mappedBy = "occurrence", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
}
