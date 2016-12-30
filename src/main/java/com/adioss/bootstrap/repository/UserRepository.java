package com.adioss.bootstrap.repository;

import com.adioss.bootstrap.domain.User;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    Optional<User> findOneByUsername(String username);
}