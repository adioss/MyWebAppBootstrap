package com.adioss.bootstrap.service;

import java.util.*;
import java.util.stream.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.UserRepository;
import com.adioss.bootstrap.web.dto.UserDTO;

import static java.lang.String.format;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    Optional<User> getUserById(long id) {
        return Optional.ofNullable(userRepository.findOne(id));
    }

    Optional<User> getUserByUsername(String username) {
        return userRepository.findOneByUsername(username);
    }

    public Collection<User> getAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    public User create(UserDTO userDTO) {
        String passwordHash = new BCryptPasswordEncoder().encode(userDTO.getPassword());
        User user = new User(userDTO.getUsername(), userDTO.getEmail(), passwordHash, userDTO.getLanguage(), userDTO.getRoles());
        return userRepository.save(user);
    }

    public void updatePassword(Long id, String newPassword, String newPasswordValidation) {
        User user = userRepository.findOne(id);
        if (user == null) {
            throw new IllegalArgumentException(format("No user found with id '%d'", id));
        }
        if (newPassword == null || newPassword.isEmpty() || newPasswordValidation == null || newPasswordValidation.isEmpty()) {
            throw new IllegalArgumentException("user.password.error.value.null");
        }
        if (!newPassword.equals(newPasswordValidation)) {
            throw new IllegalArgumentException("user.password.error.value.different");
        }
        String passwordHash = new BCryptPasswordEncoder().encode(newPassword);
        user.setPasswordHash(passwordHash);
        userRepository.save(user);
    }
}
