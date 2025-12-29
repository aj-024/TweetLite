package com.minitweet.minitweet.repository;

import com.minitweet.minitweet.entity.TweeterUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TweeterUserRepository extends JpaRepository<TweeterUserEntity, Long> {
    Optional<TweeterUserEntity> findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
