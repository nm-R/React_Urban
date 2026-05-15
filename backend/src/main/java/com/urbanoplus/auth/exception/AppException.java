package com.urbanoplus.auth.exception;

import org.springframework.http.HttpStatus;

/**
 * Single custom exception for the whole app.
 * Carry the HTTP status you want returned, plus a human-readable message.
 *
 * Usage examples:
 *   throw new AppException(HttpStatus.NOT_FOUND,      "User not found");
 *   throw new AppException(HttpStatus.UNAUTHORIZED,   "Invalid credentials");
 *   throw new AppException(HttpStatus.CONFLICT,       "E-mail already registered");
 */
public class AppException extends RuntimeException {

    private final HttpStatus status;

    public AppException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
