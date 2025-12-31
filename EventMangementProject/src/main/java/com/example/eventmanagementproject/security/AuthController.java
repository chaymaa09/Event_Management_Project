package com.example.eventmanagementproject.security;


import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController("/auth")
public class AuthController {

    @GetMapping("/me")
    public Map<String, Object> me(Authentication authentication) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;
        Jwt jwt = token.getToken();

        return Map.of(
                "username", jwt.getClaim("preferred_username"),
                "email", jwt.getClaim("email")
        );
    }

    @GetMapping("/user/profile")
    public Map<String, Object> userProfile(Authentication authentication) {
        JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;
        Jwt jwt = token.getToken();
        return Map.of(
                "username", jwt.getClaim("preferred_username"),
                "email", jwt.getClaim("email"),
                "name", jwt.getClaim("name")
        );
    }

    @GetMapping("/data")
    public Map<String, String> getData() {
        return Map.of("message", "Protected data accessible to all authenticated users");
    }

}
