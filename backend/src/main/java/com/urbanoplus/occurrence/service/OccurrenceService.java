package com.urbanoplus.occurrence.service;

import com.urbanoplus.auth.exception.AppException;
import com.urbanoplus.auth.model.User;
import com.urbanoplus.auth.repository.UserRepository;
import com.urbanoplus.occurrence.dto.*;
import com.urbanoplus.occurrence.model.*;
import com.urbanoplus.occurrence.repository.*;
import com.urbanoplus.occurrence.storage.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class OccurrenceService {

    private final OccurrenceRepository occurrenceRepository;
    private final CommentRepository commentRepository;
    private final PhotoRepository photoRepository;
    private final UserRepository userRepository;
    private final StorageService storageService;

    // Autenticado

    public List<OccurrenceResponse> listApproved() {
        return occurrenceRepository
                .findByStatusAndExpiresAtAfter(OccurrenceStatus.APPROVED, LocalDateTime.now())
                .stream().map(this::toResponse).toList();
    }

    public OccurrenceResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    public List<CommentResponse> listComments(Long occurrenceId) {
        findOrThrow(occurrenceId); // garante que a ocorrência existe
        return commentRepository.findByOccurrenceId(occurrenceId)
                .stream().map(this::toCommentResponse).toList();
    }

        public List<OccurrenceResponse> listLatest() {
            return occurrenceRepository
                    .findTop5ByStatusAndExpiresAtAfterOrderByCreatedAtDesc(
                        OccurrenceStatus.APPROVED, LocalDateTime.now()
                    )
                    .stream().map(this::toResponse).toList();
        }

    // User

    public OccurrenceResponse create(OccurrenceRequest req, List<MultipartFile> files, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));

        Occurrence o = new Occurrence();
        o.setTitle(req.getTitle());
        o.setDescription(req.getDescription());
        o.setCategory(req.getCategory());
        o.setLatitude(req.getLatitude());
        o.setLongitude(req.getLongitude());
        o.setRadius(req.getRadius());
        o.setUser(user);
        o.setStatus(OccurrenceStatus.PENDING);

        Occurrence saved = occurrenceRepository.save(o);

        if (files != null) {
            files.forEach(file -> {
                String url = storageService.save(file);
                Photo photo = new Photo();
                photo.setUrl(url);
                photo.setOccurrence(saved);
                photoRepository.save(photo);
            });
        }

        return toResponse(occurrenceRepository.findById(Objects.requireNonNull(saved.getId())).orElseThrow());
    }

    public OccurrenceResponse reopen(Long id, String email) {
        Occurrence o = findOrThrow(id);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));

        if (!o.getUser().getId().equals(user.getId())) {
            throw new AppException(HttpStatus.FORBIDDEN, "You are not allowed to reopen this occurrence");
        }
        if (o.getStatus() != OccurrenceStatus.EXPIRED) {
            throw new AppException(HttpStatus.CONFLICT, "Only expired occurrences can be reopened");
        }

        o.setStatus(OccurrenceStatus.PENDING);
        o.setApprovedAt(null);
        o.setExpiresAt(null);

        return toResponse(occurrenceRepository.save(o));
    }

    public CommentResponse addComment(Long occurrenceId, CommentRequest req, String email) {
        Occurrence o = findOrThrow(occurrenceId);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));

        Comment comment = new Comment();
        comment.setText(req.getText());
        comment.setOccurrence(o);
        comment.setUser(user);

        return toCommentResponse(commentRepository.save(comment));
    }

    public List<OccurrenceResponse> myOccurrences(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "User not found"));
        return occurrenceRepository.findByUserId(user.getId())
                .stream().map(this::toResponse).toList();
    }

    // Admin

    public List<OccurrenceResponse> listByStatus(OccurrenceStatus status) {
        return occurrenceRepository.findByStatus(status)
                .stream().map(this::toResponse).toList();
    }

    public OccurrenceResponse approve(Long id) {
        Occurrence o = findOrThrow(id);

        if (o.getStatus() == OccurrenceStatus.APPROVED) {
            throw new AppException(HttpStatus.CONFLICT, "Occurrence is already approved");
        }

        o.setStatus(OccurrenceStatus.APPROVED);
        o.setApprovedAt(LocalDateTime.now());
        o.setExpiresAt(LocalDateTime.now().plusHours(24));
        return toResponse(occurrenceRepository.save(o));
    }

    public OccurrenceResponse reject(Long id, RejectRequest req) {
        Occurrence o = findOrThrow(id);

        if (o.getStatus() == OccurrenceStatus.REJECTED) {
            throw new AppException(HttpStatus.CONFLICT, "Occurrence is already rejected");
        }

        o.setStatus(OccurrenceStatus.REJECTED);
        o.setRejectionReason(req.getReason());
        return toResponse(occurrenceRepository.save(o));
    }

    public void deleteComment(Long occurrenceId, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "Comment not found"));

        if (!comment.getOccurrence().getId().equals(occurrenceId)) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Comment does not belong to this occurrence");
        }

        commentRepository.delete(comment);
    }

    // Utilitario

    private Occurrence findOrThrow(Long id) {
        return occurrenceRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new AppException(HttpStatus.NOT_FOUND, "Occurrence not found"));
    }

    private OccurrenceResponse toResponse(Occurrence o) {
        OccurrenceResponse res = new OccurrenceResponse();
        res.setId(o.getId());
        res.setTitle(o.getTitle());
        res.setDescription(o.getDescription());
        res.setCategory(o.getCategory());
        res.setLatitude(o.getLatitude());
        res.setLongitude(o.getLongitude());
        res.setRadius(o.getRadius());
        res.setStatus(o.getStatus());
        res.setRejectionReason(o.getRejectionReason());
        res.setCreatedAt(o.getCreatedAt());
        res.setExpiresAt(o.getExpiresAt());
        res.setUserName(o.getUser().getName());

        if (o.getPhotos() != null) {
            res.setPhotoUrls(o.getPhotos().stream().map(Photo::getUrl).toList());
        }

        return res;
    }

    private CommentResponse toCommentResponse(Comment c) {
        CommentResponse res = new CommentResponse();
        res.setId(c.getId());
        res.setText(c.getText());
        res.setUserName(c.getUser().getName());
        res.setCreatedAt(c.getCreatedAt());
        return res;
    }
}
