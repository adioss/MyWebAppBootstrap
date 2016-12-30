package com.adioss.bootstrap.repository;

import com.adioss.bootstrap.domain.Avatar;
import com.adioss.bootstrap.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AvatarRepository extends CrudRepository<Avatar, Long> {
    Optional<Avatar> findOneByUser(User user);
}
