package com.urbanoplus.auth.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;

public record ErrorResponse(
        int status,
        String error,

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        LocalDateTime timestamp
) {
    /** Convenience factory so callers don't have to supply the timestamp. */
    public static ErrorResponse of(int status, String error) {
        return new ErrorResponse(status, error, LocalDateTime.now());
    }
}
