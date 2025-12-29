package com.minitweet.minitweet.service.impl;

import com.minitweet.minitweet.dto.TweeterNewPostDto;
import com.minitweet.minitweet.dto.TweeterPostDto;
import com.minitweet.minitweet.entity.TweeterPostEntity;
import com.minitweet.minitweet.entity.TweeterUserEntity;
import com.minitweet.minitweet.exception.ResourceNotFoundException; // ✅ Added Import
import com.minitweet.minitweet.repository.TweeterPostRepository;
import com.minitweet.minitweet.repository.TweeterUserRepository;
import com.minitweet.minitweet.service.TweeterPostService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class TweeterPostServiceImpl implements TweeterPostService {
    private final ModelMapper modelMapper;
    private final TweeterPostRepository tweeterPostRepository;
    private final TweeterUserRepository tweeterUserRepository;

    @Override
    public List<TweeterPostDto> getAllTweeterPosts() {
        List <TweeterPostEntity> tweeterPostEntities = tweeterPostRepository.findAll();
        return tweeterPostEntities
                .stream()
                .map(post -> modelMapper.map(post, TweeterPostDto.class))
                .toList();
    }

    @Override
    public TweeterPostDto addTweeterPost(TweeterNewPostDto tweeterNewPostDto) {
        // ✅ Refactored: Throws 404 if User ID is invalid
        TweeterUserEntity user = tweeterUserRepository.findById(tweeterNewPostDto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", tweeterNewPostDto.getUserId()));

        TweeterPostEntity postEntity = new TweeterPostEntity();
        postEntity.setTitle(tweeterNewPostDto.getTitle());
        postEntity.setContent(tweeterNewPostDto.getContent());
        postEntity.setUser(user);

        TweeterPostEntity savedPost = tweeterPostRepository.save(postEntity);

        return modelMapper.map(savedPost, TweeterPostDto.class);
    }

    @Override
    public TweeterPostDto getTweeterPostById(Long id) {
        // ✅ Refactored: Throws 404 if Post ID not found
        TweeterPostEntity tweeterPostEntity = tweeterPostRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        return modelMapper.map(tweeterPostEntity, TweeterPostDto.class);
    }

    @Override
    public void deleteTweeterPostById(Long postId) {
        // ✅ Refactored
        TweeterPostEntity tweeterPostEntity = tweeterPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

        tweeterPostRepository.deleteById(postId);
    }

    @Override
    public TweeterPostDto updateTweeterPost(Long postId, TweeterNewPostDto tweeterNewPostDto) {
        // ✅ Refactored
        TweeterPostEntity tweeterPostEntity = tweeterPostRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

        tweeterPostEntity.setTitle(tweeterNewPostDto.getTitle());
        tweeterPostEntity.setContent(tweeterNewPostDto.getContent());

        TweeterPostEntity updatedPost = tweeterPostRepository.save(tweeterPostEntity);
        return modelMapper.map(updatedPost, TweeterPostDto.class);
    }
}