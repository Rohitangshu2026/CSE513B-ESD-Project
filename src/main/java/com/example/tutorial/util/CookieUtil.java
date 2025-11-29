package com.example.tutorial.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.HttpHeaders;

public class CookieUtil {

    public static void addCookie(HttpServletResponse response, String name, String value, boolean httpOnly) {

        ResponseCookie cookie = ResponseCookie.from(name, value)
                .httpOnly(httpOnly)
                .secure(false)           // true if https
                .path("/")
                .domain("localhost")
                .sameSite("None")
                .maxAge(60 * 60 * 24 * 7)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public static String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(name)) {
                return cookie.getValue();
            }
        }
        return null;
    }
}