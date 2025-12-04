package com.minitweet.minitweet.service;

import com.minitweet.minitweet.dto.TweeterNewPostDto;
import com.minitweet.minitweet.dto.TweeterPostDto;

import java.util.List;

public interface TweeterPostService {
    List<TweeterPostDto> getAllTweeterPosts();

    TweeterPostDto addTweeterPost(TweeterNewPostDto tweeterNewPostDto);

    TweeterPostDto getTweeterPostById(Long id);

    void deleteTweeterPostById(Long postId);

    TweeterPostDto updateTweeterPost(Long postId, TweeterNewPostDto tweeterNewPostDto);
}
