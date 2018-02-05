package com.adioss.bootstrap.service;

import java.io.*;
import java.nio.file.Files;
import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.adioss.bootstrap.domain.Avatar;
import com.adioss.bootstrap.domain.User;
import com.adioss.bootstrap.repository.AvatarRepository;

@Service
public class StorageService {
    private static final Logger log = LoggerFactory.getLogger(StorageService.class);
    private final ApplicationContext appContext;
    private final UserService userService;
    private final AvatarRepository avatarRepository;

    @Autowired
    public StorageService(ApplicationContext appContext, UserService userService, AvatarRepository avatarRepository) {
        this.appContext = appContext;
        this.userService = userService;
        this.avatarRepository = avatarRepository;
    }

    public byte[] loadAsResource(Long id) {
        Optional<User> userById = userService.getUserById(id);
        if (!userById.isPresent()) {
            return getDefaultAvatar();
        }
        Optional<Avatar> avatarByUser = avatarRepository.findOneByUser(userById.get());
        if (!avatarByUser.isPresent()) {
            return getDefaultAvatar();
        }
        byte[] data = avatarByUser.get().getData();
        if (data == null) {
            return getDefaultAvatar();
        }
        return data;
    }

    private byte[] getDefaultAvatar() {
        final Resource defaultAvatar = appContext.getResource("classpath:static/assets/img/unknown-user.gif");
        try {
            return Files.readAllBytes(defaultAvatar.getFile().toPath());
        } catch (IOException e) {
            log.error("Impossible to load default avatar image.");
        }
        return null;
    }

    public void remove(User user) {
        Avatar toSave;
        Optional<Avatar> oneByUser = avatarRepository.findOneByUser(user);
        if (!oneByUser.isPresent()) {
            throw new IllegalArgumentException("Impossilble to load avatar bytes.");
        }
        toSave = oneByUser.get();
        toSave.setData(null);
        avatarRepository.save(toSave);
    }

    public Long store(User user, MultipartFile file) {
        Avatar toSave;
        Optional<Avatar> oneByUser = avatarRepository.findOneByUser(user);
        toSave = oneByUser.orElseGet(() -> new Avatar(user, null));
        try {
            toSave.setData(file.getBytes());
        } catch (IOException e) {
            throw new IllegalArgumentException("Impossilble to load avatar bytes.");
        }
        Avatar saved = avatarRepository.save(toSave);
        return saved.getId();
    }
}
