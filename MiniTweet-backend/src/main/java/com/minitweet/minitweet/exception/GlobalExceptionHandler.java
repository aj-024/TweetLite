package com.minitweet.minitweet.exception;

import com.minitweet.minitweet.dto.ErrorDetailsDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError; // Import this
import org.springframework.web.bind.MethodArgumentNotValidException; // Import this
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 1. Handle Resource Not Found (e.g., User not found)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetailsDto> handleResourceNotFoundException(ResourceNotFoundException exception,
                                                                           WebRequest webRequest) {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                LocalDateTime.now(),
                exception.getMessage(),
                webRequest.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    // 2. ✅ NEW: Handle Validation Errors (e.g., Password too short, Username empty)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetailsDto> handleValidationExceptions(MethodArgumentNotValidException ex, WebRequest webRequest) {

        // Extract the specific error message (e.g., "Username must be between 3 and 50 characters")
        // We get the first error if there are multiple, to keep the UI clean.
        String errorMessage = ex.getBindingResult().getAllErrors().get(0).getDefaultMessage();

        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                LocalDateTime.now(),
                errorMessage, // This sends the clean message!
                webRequest.getDescription(false)
        );

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    // 3. Handle Global Exceptions (Catch-all)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailsDto> handleGlobalException(Exception exception,
                                                                 WebRequest webRequest) {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                LocalDateTime.now(),
                exception.getMessage(),
                webRequest.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 3. ✅ NEW: Handle Bad Requests (like Duplicate Username/Email)
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDetailsDto> handleBadRequestException(BadRequestException exception,
                                                                     WebRequest webRequest) {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                LocalDateTime.now(),
                exception.getMessage(),
                webRequest.getDescription(false)
        );
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}