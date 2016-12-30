package com.adioss.bootstrap.web.controller;

import com.adioss.bootstrap.domain.Role;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.UserRepository;
import com.adioss.bootstrap.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Controller
@RequestMapping("/api/avatars")
public class AvatarController {
    private final StorageService storageService;
    private final UserRepository userRepository;

    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    public AvatarController(StorageService storageService, UserRepository userRepository) {
        this.storageService = storageService;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/{userId}",
            method = RequestMethod.GET,
            produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE}
    )
    @ResponseBody
    public ResponseEntity<byte[]> retrieve(@PathVariable String userId) {
        byte[] bytes = storageService.loadAsResource(Long.valueOf(userId));
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(bytes, headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.POST,
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> upload(Principal principal, @PathVariable String userId,
                                    @RequestParam("file") MultipartFile file) {
        checkContentType(file.getContentType());
        Optional<User> user = userRepository.findOneByUsername(principal.getName());
        if (!user.isPresent()) {
            throw new IllegalArgumentException();
        }
        User currentUser = user.get();
        List<Role> roles = currentUser.getRoles();
        if (Objects.equals(currentUser.getId(), Long.valueOf(userId)) ||
                (roles != null && !roles.isEmpty() && roles.contains(Role.ADMIN))) {
            User targetUser = userRepository.findOne(Long.valueOf(userId));
            storageService.store(targetUser, file);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping(value = "/{userId}", method = RequestMethod.DELETE,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> delete(Principal principal, @PathVariable String userId) {
        Optional<User> user = userRepository.findOneByUsername(principal.getName());
        if (!user.isPresent()) {
            throw new IllegalArgumentException();
        }
        User currentUser = user.get();
        List<Role> roles = currentUser.getRoles();
        if (Objects.equals(currentUser.getId(), Long.valueOf(userId)) ||
                (roles != null && !roles.isEmpty() && roles.contains(Role.ADMIN))) {
            User targetUser = userRepository.findOne(Long.valueOf(userId));
            storageService.remove(targetUser);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private void checkContentType(String contentType) {
        if (contentType.startsWith("image/")) {
            return;
        }
        throw new IllegalArgumentException("Content type is not valid for avatar image");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity handleStorageFileNotFound(IllegalArgumentException e) {
        return ResponseEntity.notFound().build();
    }

}