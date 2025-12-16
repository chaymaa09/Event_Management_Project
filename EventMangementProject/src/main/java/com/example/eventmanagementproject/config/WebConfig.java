package com.example.eventmanagementproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    // SPA fallback routing removed for dev proxy setup
    // This will be needed only for single-port production deployment
}
