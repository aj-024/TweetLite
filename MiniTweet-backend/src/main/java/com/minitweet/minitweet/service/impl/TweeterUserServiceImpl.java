package com.minitweet.minitweet.service.impl;

import com.minitweet.minitweet.dto.TweeterUserDto;
import com.minitweet.minitweet.entity.TweeterUserEntity;
import com.minitweet.minitweet.exception.BadRequestException; // ✅ Import this
import com.minitweet.minitweet.exception.ResourceNotFoundException;
import com.minitweet.minitweet.repository.TweeterUserRepository;
import com.minitweet.minitweet.service.TweeterUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TweeterUserServiceImpl implements TweeterUserService {
    private final ModelMapper modelMapper;
    private final TweeterUserRepository tweeterUserRepository;

    @Override
    public TweeterUserDto signup(TweeterUserDto tweeterUserDto) {
        // 1. Sanitize Input
        if(tweeterUserDto.getUsername() != null) {
            tweeterUserDto.setUsername(tweeterUserDto.getUsername().trim());
        }
        if(tweeterUserDto.getPassword() != null) {
            tweeterUserDto.setPassword(tweeterUserDto.getPassword().trim());
        }

        // 2. ✅ Check for Duplicates (The new logic)
        if(tweeterUserRepository.existsByUsername(tweeterUserDto.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        // Note: Check if email is not null before checking DB to avoid errors
        if(tweeterUserDto.getEmail() != null && tweeterUserRepository.existsByEmail(tweeterUserDto.getEmail())) {
            throw new BadRequestException("Email is already registered!");
        }

        // 3. Save User
        TweeterUserEntity tweeterUserEntity = modelMapper.map(tweeterUserDto, TweeterUserEntity.class);
        return modelMapper.map(tweeterUserRepository.save(tweeterUserEntity), TweeterUserDto.class);
    }

    @Override
    public TweeterUserDto login(String username, String password) {
        // 1. Sanitize Input
        String cleanUsername = (username != null) ? username.trim() : "";
        String cleanPassword = (password != null) ? password.trim() : "";

        // 2. Find User
        TweeterUserEntity user = tweeterUserRepository.findByUsername(cleanUsername)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", cleanUsername));

        // 3. Check Password
        String dbPassword = user.getPassword() != null ? user.getPassword().trim() : "";

        if (!dbPassword.equals(cleanPassword)) {
            System.out.println("LOGIN FAILED: Password mismatch for user " + cleanUsername);
            // Use BadRequestException here too so it returns 400 instead of 500
            throw new BadRequestException("Invalid username or password");
        }

        // 4. Map entity to DTO
        TweeterUserDto userDto = new TweeterUserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setUserId(user.getUserId());

        return userDto;
    }
}