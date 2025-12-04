package com.minitweet.minitweet.service.impl;

import com.minitweet.minitweet.dto.TweeterUserDto;
import com.minitweet.minitweet.entity.TweeterUserEntity;
import com.minitweet.minitweet.repository.TweeterUserRepository;
import com.minitweet.minitweet.service.TweeterUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TweeterUserServiceImpl implements TweeterUserService {
    private final ModelMapper modelMapper;
    private final TweeterUserRepository tweeterUserRepository;

    @Override
    public TweeterUserDto signup(TweeterUserDto tweeterUserDto) {
        TweeterUserEntity tweeterUserEntity = modelMapper.map(tweeterUserDto, TweeterUserEntity.class);
        return modelMapper.map(tweeterUserRepository.save(tweeterUserEntity), TweeterUserDto.class);
    }

    @Override
    public TweeterUserDto login(String username, String password) {
        TweeterUserEntity user = tweeterUserRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }

        // Map entity to DTO
        TweeterUserDto userDto = new TweeterUserDto();
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setUserId(user.getUserId());

        return userDto;
    }

}
