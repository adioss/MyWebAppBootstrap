package com.adioss.bootstrap.web.rest;

import com.adioss.bootstrap.domain.Language;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.UserRepository;
import com.adioss.bootstrap.service.UserService;
import com.adioss.bootstrap.web.dto.UserDTO;
import com.adioss.bootstrap.web.dto.UserPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static java.lang.Long.valueOf;

@RestController
@RequestMapping("/api/console/users")
public class UserResource extends AbstractResource {
    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserResource(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<User>> list(
            @PageableDefault(size = 10, sort = {"username"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(userRepository.findAll(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> retrieve(@PathVariable("id") String id) {
        User user = userRepository.findOne(valueOf(id));
        if (user == null) {
            user = new User();
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> create(@Valid @RequestBody User user) {
        if (user.getId() != null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        Optional<User> oneByUsername = userRepository.findOneByUsername(user.getUsername());
        if (oneByUsername.isPresent()) {
            throw new IllegalArgumentException("user.edition.error.duplicate");
        }
        userService
                .create(new UserDTO(user.getUsername(), user.getEmail(), "default",
                        user.getLanguage() != null ? user.getLanguage() : Language.ENGLISH,
                        user.getRoles()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> update(@Valid @RequestBody User user) {
        User userToUpdate = userRepository.findOne(user.getId());
        if (userToUpdate == null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        userToUpdate.setEmail(user.getEmail());
        userToUpdate.setLanguage(user.getLanguage());
        userToUpdate.setRoles(user.getRoles());
        userRepository.save(userToUpdate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        userRepository.delete(valueOf(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/changePassword/{id}",
            method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> changePassword(@PathVariable("id") String id,
                                            @RequestBody UserPasswordDTO userPasswordDTO) {
        userService.updatePassword(valueOf(id), userPasswordDTO.getNewPassword(),
                userPasswordDTO.getNewPasswordValidation());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
