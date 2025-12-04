package com.minitweet.minitweet.config;
import com.minitweet.minitweet.dto.TweeterPostDto;
import com.minitweet.minitweet.entity.TweeterPostEntity;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // custom mapping: post.user.username -> dto.username
        modelMapper.typeMap(TweeterPostEntity.class, TweeterPostDto.class)
                .addMapping(src -> src.getUser().getUsername(), TweeterPostDto::setUsername);

        return modelMapper;
    }
}
