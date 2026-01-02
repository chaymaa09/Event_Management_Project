package com.example.eventmanagementproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.user-avatar-dir}")
    private String userAvatarDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + (userAvatarDir.endsWith("/") ? userAvatarDir : userAvatarDir + "/");
        registry.addResourceHandler("/assets/userUploads/**")
                .addResourceLocations(location);
    }
}
