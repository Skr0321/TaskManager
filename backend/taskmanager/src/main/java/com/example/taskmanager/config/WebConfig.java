package com.example.taskmanager.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all endpoints
                .allowedOrigins("http://localhost:3000","https://task-manager-fullstack-phi.vercel.app") // Allow only this origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these methods
                .allowedHeaders("Content-Type", "Authorization") // Allow all headers
                .allowCredentials(true); // Allow credentials (optional)
    }
}
