package com.minitweet.minitweet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration; // ✅ 1. Added this
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration // ✅ 2. This is crucial for Spring to read this file
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // ✅ 3. Changed "/api/**" to "/**" to cover ALL your controllers (/user, /tweeter, etc.)
                registry.addMapping("/**")
                        .allowedOrigins(
                                "http://localhost:5173",                 // For your local testing
                                "https://tweetliteapp.vercel.app"        // ✅ Your Vercel Frontend
                        )
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}