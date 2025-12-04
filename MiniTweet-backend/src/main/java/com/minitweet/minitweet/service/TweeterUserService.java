package com.minitweet.minitweet.service;

import com.minitweet.minitweet.dto.TweeterPostDto;
import com.minitweet.minitweet.dto.TweeterUserDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public interface TweeterUserService {
    TweeterUserDto signup(TweeterUserDto tweeterUserDto);


    TweeterUserDto login(@NotBlank(message = "Username is required") @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters") String username, @NotBlank(message = "Password is required") @Size(min = 6, max = 100, message = "Password must be at least 6 characters") String password);
}
