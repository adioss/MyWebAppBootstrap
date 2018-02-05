package com.adioss.bootstrap.web.rest;

import java.security.Principal;
import java.util.*;
import javax.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.UserRepository;
import com.adioss.bootstrap.service.UserService;
import com.adioss.bootstrap.web.dto.UserPasswordDTO;

@RestController
@RequestMapping("/api/profile")
public class ProfileResource {
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public ProfileResource(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> currentUser(Principal principal) {
        Optional<User> user = userRepository.findOneByUsername(principal.getName());
        if (!user.isPresent()) {
            throw new IllegalArgumentException();
        }
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<HttpStatus> update(Principal principal, @Valid @RequestBody User user) {
        if (user.getId() == null) {
            throw new IllegalArgumentException("profile.edition.error");
        }
        Optional<User> oneByUsername = userRepository.findOneByUsername(principal.getName());
        if (!oneByUsername.isPresent()) {
            throw new IllegalArgumentException("profile.edition.error");
        }
        User userToUpdate = oneByUsername.get();
        if (!Objects.equals(userToUpdate.getId(), user.getId())) {
            throw new IllegalArgumentException("profile.edition.error");
        }
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setLanguage(user.getLanguage());
        userRepository.save(userToUpdate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {
            MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<HttpStatus> changePassword(Principal principal, @RequestBody UserPasswordDTO userPasswordDTO) {
        Optional<User> oneByUsername = userRepository.findOneByUsername(principal.getName());
        if (!oneByUsername.isPresent()) {
            throw new IllegalArgumentException("profile.password.edition.error");
        }
        userService.updatePassword(oneByUsername.get().getId(), //
                                   userPasswordDTO.getNewPassword(), userPasswordDTO.getNewPasswordValidation());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
