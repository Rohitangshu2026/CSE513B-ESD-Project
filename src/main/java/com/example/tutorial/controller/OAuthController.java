package com.example.tutorial.controller;

import com.example.tutorial.service.TokenService;
import com.example.tutorial.util.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final TokenService tokenService;

    @Value("${google.client_id}")
    private String clientId;

    @Value("${google.redirect_uri}")
    private String redirectUri;

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws Exception {
        String url =
                "https://accounts.google.com/o/oauth2/v2/auth?"
                        + "scope=openid%20email%20profile&"
                        + "response_type=code&"
                        + "redirect_uri=http://localhost:8080/api/employee/oauth2/callback&"
                        + "client_id=186079157780-t8iv6s2t0faf06ge4onuqln30dujjg09.apps.googleusercontent.com";

        response.sendRedirect(url);
    }

    @GetMapping("/oauth2/callback")
    public void callback(
            @RequestParam("code") String code,
            HttpServletResponse response
    ) throws Exception {

        String idToken = tokenService.exchangeCode(code);
        String email = tokenService.extractEmail(idToken);

        if (!email.matches("^outreach[a-zA-Z0-9]+@gmail\\.com$")) {
            response.sendRedirect("http://localhost:5173/access-denied");
            return;
        }

        CookieUtil.addCookie(response, "ID_TOKEN", idToken, true);
        response.sendRedirect("http://localhost:5173/org/list");
    }

}