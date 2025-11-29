package com.example.tutorial.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@Service
public class TokenService {

    @Value("${google.client_id}")
    private String clientId;

    @Value("${google.client_secret}")
    private String clientSecret;

    @Value("${google.redirect_uri}")
    private String redirectUri;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String exchangeCode(String code) throws Exception {

        String url = "https://oauth2.googleapis.com/token";
        String params = "code=" + code +
                "&client_id=" + clientId +
                "&client_secret=" + clientSecret +
                "&redirect_uri=" + redirectUri +
                "&grant_type=authorization_code";

        HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
        conn.setDoOutput(true);

        conn.getOutputStream().write(params.getBytes(StandardCharsets.UTF_8));

        InputStream is = conn.getInputStream();
        String result = new String(is.readAllBytes(), StandardCharsets.UTF_8);

        JsonNode json = objectMapper.readTree(result);

        return json.get("id_token").asText();
    }

    public boolean validate(String idToken) throws Exception {

        String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;

        InputStream is = new URL(tokenInfoUrl).openStream();
        String resp = new String(is.readAllBytes());

        JsonNode json = objectMapper.readTree(resp);

        String audience = json.get("aud").asText();

        return audience.equals(clientId);
    }
    public String extractEmail(String idToken) throws Exception {
        String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken;

        InputStream is = new URL(tokenInfoUrl).openStream();
        String resp = new String(is.readAllBytes());

        JsonNode json = objectMapper.readTree(resp);
        return json.get("email").asText();
    }
}