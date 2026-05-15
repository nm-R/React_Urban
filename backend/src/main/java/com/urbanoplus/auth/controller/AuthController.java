package com.urbanoplus.auth.controller;

import com.urbanoplus.auth.dto.*;
import com.urbanoplus.auth.exception.AppException;
import com.urbanoplus.auth.security.JwtUtil;
import com.urbanoplus.auth.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService service;
    private final JwtUtil jwt;

    @PostMapping("/users")
    public void register(@RequestBody UserRequest req) {
        service.register(req);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest req) {
        return service.login(req);
    }

    @GetMapping("/me")
    public Object me(HttpServletRequest req) {
        String header = req.getHeader("Authorization");

        if (header == null || !header.startsWith("Bearer ")) {
            throw new AppException(HttpStatus.UNAUTHORIZED, "Authorization header is missing or malformed");
        }

        String token = header.replace("Bearer ", "");

        String email;
        try {
            email = jwt.getEmail(token);
        } catch (Exception e) {
            throw new AppException(HttpStatus.UNAUTHORIZED, "Invalid or expired token");
        }

        return service.me(email);
    }
}
