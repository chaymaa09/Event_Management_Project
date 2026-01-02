package com.example.eventmanagementproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(@NonNull ViewControllerRegistry registry) {
        // SPA fallback: forward non-API, non-static routes to Angular index.html
        // This enables deep links like /profile and /settings when serving the frontend from Spring Boot.
        registry.addViewController("/{path:^(?!api$)(?!assets$)[^\\.]*}")
                .setViewName("forward:/index.html");
        registry.addViewController("/{path:^(?!api$)(?!assets$)[^\\.]*}/**")
                .setViewName("forward:/index.html");
    }
}
