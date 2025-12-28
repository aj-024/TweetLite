package com.minitweet.minitweet.service.impl;

import com.minitweet.minitweet.dto.TweeterUserDto;
import com.minitweet.minitweet.entity.TweeterUserEntity;
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
        // Sanitize input: Remove leading/trailing spaces
        if(tweeterUserDto.getUsername() != null) {
            tweeterUserDto.setUsername(tweeterUserDto.getUsername().trim());
        }
        if(tweeterUserDto.getPassword() != null) {
            tweeterUserDto.setPassword(tweeterUserDto.getPassword().trim());
        }

        TweeterUserEntity tweeterUserEntity = modelMapper.map(tweeterUserDto, TweeterUserEntity.class);
        return modelMapper.map(tweeterUserRepository.save(tweeterUserEntity), TweeterUserDto.class);
    }

    @Override
    public TweeterUserDto login(String username, String password) {
        // 1. Sanitize Input
        String cleanUsername = (username != null) ? username.trim() : "";
        String cleanPassword = (password != null) ? password.trim() : "";

        // DEBUG LOG: Check Render logs to see this
        System.out.println("Attempting login for: '" + cleanUsername + "'");

        // 2. Find User
        TweeterUserEntity user = tweeterUserRepository.findByUsername(cleanUsername)
                .orElseThrow(() -> {
                    System.out.println("LOGIN FAILED: User '" + cleanUsername + "' not found in DB.");
                    return new RuntimeException("Invalid credentials");
                });

        // 3. Check Password (with DB trimming to fix Postgres padding issues)
        String dbPassword = user.getPassword() != null ? user.getPassword().trim() : "";

        if (!dbPassword.equals(cleanPassword)) {
            System.out.println("LOGIN FAILED: Password mismatch for user " + cleanUsername);
            // UNCOMMENT ONLY FOR DEBUGGING (Don't leave this in production long term)
            // System.out.println("DB Password: '" + dbPassword + "' vs Input: '" + cleanPassword + "'");

            throw new RuntimeException("Invalid credentials");
        }

        // 4. Map entity to DTO
        // Using ModelMapper here for consistency with signup (or stick to your manual set if preferred)
        TweeterUserDto userDto = new TweeterUserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setUserId(user.getUserId());

        return userDto;
    }
}