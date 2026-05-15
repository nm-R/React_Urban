// JwtFilter.java
package com.urbanoplus.auth.security;

import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";

    private final JwtUtil jwt;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain chain)
            throws IOException, ServletException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith(BEARER_PREFIX)) {
            String token = header.substring(BEARER_PREFIX.length());

            if (jwt.validateToken(token)) {
                String email = jwt.getEmail(token);
                String role  = jwt.getRole(token);

                var authority = new SimpleGrantedAuthority("ROLE_" + role);

                var auth = new UsernamePasswordAuthenticationToken(
                        email, null, List.of(authority)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                log.warn("Invalid or expired JWT from {}", request.getRemoteAddr());
            }
        }

        chain.doFilter(request, response);
    }
}