package com.example.eventmanagementproject.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KeycloakAdminService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String serverUrl;
    private final String adminRealm;
    private final String targetRealm;
    private final String clientId;
    private final String username;
    private final String password;

    public KeycloakAdminService(
            @Value("${keycloak.admin.server-url:http://localhost:8080}") String serverUrl,
            @Value("${keycloak.admin.admin-realm:master}") String adminRealm,
            @Value("${keycloak.admin.target-realm:event-management-realm}") String targetRealm,
            @Value("${keycloak.admin.client-id:admin-cli}") String clientId,
            @Value("${keycloak.admin.username:}") String username,
            @Value("${keycloak.admin.password:}") String password) {
        this.serverUrl = serverUrl;
        this.adminRealm = adminRealm;
        this.targetRealm = targetRealm;
        this.clientId = clientId;
        this.username = username;
        this.password = password;
    }

    private String getAdminAccessToken() {
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            // Admin credentials not configured – skip Keycloak deletion silently.
            return null;
        }

        String tokenUrl = serverUrl + "/realms/" + adminRealm + "/protocol/openid-connect/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId);
        body.add("username", username);
        body.add("password", password);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            return null;
        }
        Object token = response.getBody().get("access_token");
        return token != null ? token.toString() : null;
    }

    public void deleteUserById(String keycloakUserId) {
        String accessToken = getAdminAccessToken();
        if (accessToken == null || keycloakUserId == null || keycloakUserId.isBlank()) {
            return;
        }

        String deleteUrl = serverUrl + "/admin/realms/" + targetRealm + "/users/" + keycloakUserId;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        try {
            restTemplate.exchange(deleteUrl, HttpMethod.DELETE, request, Void.class);
        } catch (Exception ignored) {
            System.out.println("deleition in keycloak faild");
        }
    }
}
