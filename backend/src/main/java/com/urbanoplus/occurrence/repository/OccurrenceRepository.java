package com.urbanoplus.occurrence.repository;

import com.urbanoplus.occurrence.model.Occurrence;
import com.urbanoplus.occurrence.model.OccurrenceStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OccurrenceRepository extends JpaRepository<Occurrence, Long> {

    // Public map: Aprovado e não expirado
    List<Occurrence> findByStatusAndExpiresAtAfter(OccurrenceStatus status, LocalDateTime now);

    // Painel adm: filtrar por status
    List<Occurrence> findByStatus(OccurrenceStatus status);

    // Minhas ocorrencias
    List<Occurrence> findByUserId(Long userId);

    // Latest: aprovadas, não expiradas, ordenadas por data de criação
    List<Occurrence> findTop5ByStatusAndExpiresAtAfterOrderByCreatedAtDesc(
            OccurrenceStatus status, LocalDateTime now
    );
}
