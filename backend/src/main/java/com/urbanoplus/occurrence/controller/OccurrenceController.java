package com.urbanoplus.occurrence.controller;

import com.urbanoplus.occurrence.dto.*;
import com.urbanoplus.occurrence.model.OccurrenceStatus;
import com.urbanoplus.occurrence.service.OccurrenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/occurrences")
@RequiredArgsConstructor
public class OccurrenceController {

    private final OccurrenceService service;

    // Autenticado

    @GetMapping
    public List<OccurrenceResponse> listApproved() {
        return service.listApproved();
    }

    @GetMapping("/{id}")
    public OccurrenceResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/{id}/comments")
    public List<CommentResponse> listComments(@PathVariable Long id) {
        return service.listComments(id);
    }

    @GetMapping("/my")
    public List<OccurrenceResponse> myOccurrences(Principal principal) {
        return service.myOccurrences(principal.getName());
    }

    // User

    @GetMapping("/latest")
    public List<OccurrenceResponse> listLatest() {
        return service.listLatest();
    }

    @PostMapping(consumes = "multipart/form-data")
    public OccurrenceResponse create(
            @RequestPart("data") OccurrenceRequest req,
            @RequestPart(value = "photos", required = false) List<MultipartFile> photos,
            Principal principal
    ) {
        return service.create(req, photos, principal.getName());
    }

    @PostMapping("/{id}/reopen")
    public OccurrenceResponse reopen(@PathVariable Long id, Principal principal) {
        return service.reopen(id, principal.getName());
    }

    @PostMapping("/{id}/comments")
    public CommentResponse addComment(
            @PathVariable Long id,
            @RequestBody CommentRequest req,
            Principal principal
    ) {
        return service.addComment(id, req, principal.getName());
    }

    // Admin

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OccurrenceResponse> listByStatus(@RequestParam OccurrenceStatus status) {
        return service.listByStatus(status);
    }

    @PatchMapping("/{id}/approve")
    @PreAuthorize("hasRole('ADMIN')")
    public OccurrenceResponse approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PatchMapping("/{id}/reject")
    @PreAuthorize("hasRole('ADMIN')")
    public OccurrenceResponse reject(@PathVariable Long id, @RequestBody RejectRequest req) {
        return service.reject(id, req);
    }

    @DeleteMapping("/{occurrenceId}/comments/{commentId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long occurrenceId,
            @PathVariable Long commentId
    ) {
        service.deleteComment(occurrenceId, commentId);
        return ResponseEntity.noContent().build();
    }
}
