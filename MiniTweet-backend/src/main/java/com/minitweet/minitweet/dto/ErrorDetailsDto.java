package com.minitweet.minitweet.dto;

import java.time.LocalDateTime;

public class ErrorDetailsDto {
    private LocalDateTime timestamp;
    private String message;
    private String details;

    public ErrorDetailsDto(LocalDateTime timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }

    // Getters
    public LocalDateTime getTimestamp() { return timestamp; }
    public String getMessage() { return message; }
    public String getDetails() { return details; }
}