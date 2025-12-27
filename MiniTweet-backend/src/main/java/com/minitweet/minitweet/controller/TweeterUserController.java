package com.minitweet.minitweet.controller;

import com.minitweet.minitweet.dto.LoginRequestDto;
import com.minitweet.minitweet.dto.TweeterUserDto;
import com.minitweet.minitweet.service.TweeterUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {
        "http://localhost:5173", // for local dev
        "https://tweetliteapp.vercel.app" // for Vercel frontend
})
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class TweeterUserController {
    private final TweeterUserService tweeterUserService;

    @PostMapping("/signup")
    public ResponseEntity<TweeterUserDto> signup(@RequestBody TweeterUserDto tweeterUserDto) {
        return ResponseEntity.ok(tweeterUserService.signup(tweeterUserDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TweeterUserDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        try {
            TweeterUserDto userDto = tweeterUserService.login(
                    loginRequestDto.getUsername(), loginRequestDto.getPassword());
            return ResponseEntity.ok(userDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
}
