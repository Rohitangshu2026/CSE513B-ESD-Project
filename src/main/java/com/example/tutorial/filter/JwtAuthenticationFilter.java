package com.example.tutorial.filter;

import com.example.tutorial.service.TokenService;
import com.example.tutorial.util.CookieUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        String method = request.getMethod().toUpperCase();

        // ⭐ ALLOW swagger completely
        if (path.startsWith("/swagger-ui")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/swagger-resources")
                || path.startsWith("/webjars")
                || path.equals("/swagger-ui.html")
                || path.equals("/error")
                || path.startsWith("/api/employee/login/swagger")) {

            filterChain.doFilter(request, response);
            return;
        }

        // ⭐ Allow OAuth endpoints completely
        if (path.startsWith("/login") ||
                path.startsWith("/oauth2/callback") ||
                path.startsWith("/api/employee/login") ||
                path.startsWith("/api/employee/oauth2/callback")) {

            filterChain.doFilter(request, response);
            return;
        }

        // ⭐ Allow CORS preflight
        if (method.equals("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ⭐ Get cookie
        String token = CookieUtil.getCookieValue(request, "ID_TOKEN");
        if (token == null) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing Authentication Token");
            return;
        }

        try {
            boolean valid = tokenService.validate(token);
            if (!valid) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid ID_TOKEN");
                return;
            }

            // Extract user email from token
            String email = tokenService.extractEmail(token);

            // EMAIL MUST START WITH "outreach"
            if (!email.toLowerCase().startsWith("outreach")) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN,
                        "Access Denied – Only outreach emails allowed");
                return;
            }

            // Authentication SUCCESS
            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(email, null, java.util.List.of());
            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
