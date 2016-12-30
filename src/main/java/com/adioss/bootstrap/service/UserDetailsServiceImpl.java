package com.adioss.bootstrap.service;

import com.adioss.bootstrap.domain.Role;
import com.adioss.bootstrap.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserService userService;

    @Autowired
    public UserDetailsServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.getUserByUsername(username).orElseThrow(() ->
                new UsernameNotFoundException(String.format("User with username=%s was not found", username))
        );
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(Role::toString)
                .map(SimpleGrantedAuthority::new)
                .collect(toList());
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPasswordHash(), authorities);
    }
}
