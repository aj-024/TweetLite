package com.minitweet.minitweet.controller;

import com.minitweet.minitweet.dto.TweeterNewPostDto;
import com.minitweet.minitweet.dto.TweeterPostDto;
import com.minitweet.minitweet.service.TweeterPostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/tweeter")
@RestController
@RequiredArgsConstructor
public class TweeterPostController {
    private final TweeterPostService tweeterPostService;

    @GetMapping
    public ResponseEntity<List<TweeterPostDto>> getAllTweeterPosts() {
        return ResponseEntity.ok(tweeterPostService.getAllTweeterPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TweeterPostDto> getTweeterPostById(@PathVariable Long id) {
        return ResponseEntity.ok(tweeterPostService.getTweeterPostById(id));
    }

    @PostMapping("/addpost")
    public ResponseEntity<TweeterPostDto>addTweeterPost(@Valid @RequestBody TweeterNewPostDto tweeterNewPostDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(tweeterPostService.addTweeterPost(tweeterNewPostDto));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<TweeterPostDto> deleteTweeterPostById(@PathVariable Long postId) {
        tweeterPostService.deleteTweeterPostById(postId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{postId}")
    public ResponseEntity<TweeterPostDto> updateTweeterPost(@PathVariable Long postId, @RequestBody TweeterNewPostDto tweeterNewPostDto) {
        return ResponseEntity.ok(tweeterPostService.updateTweeterPost(postId, tweeterNewPostDto));
    }
}
