package com.example.tutorial.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI outreachOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Outreach API")
                        .description("ESD Project API Documentation")
                        .version("1.0"));
    }
}
