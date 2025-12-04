package com.minitweet.minitweet.repository;

import com.minitweet.minitweet.entity.TweeterPostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TweeterPostRepository  extends JpaRepository<TweeterPostEntity,Long> {
}
