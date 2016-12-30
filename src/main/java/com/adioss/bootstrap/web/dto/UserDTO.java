package com.adioss.bootstrap.web.dto;

import com.adioss.bootstrap.domain.Language;
import com.adioss.bootstrap.domain.Role;

import java.util.List;

import static java.util.Collections.singletonList;

public class UserDTO {
    private String username = "";
    private String email = "";
    private String password = "";
    private Language language;
    private List<Role> roles = singletonList(Role.USER);

    public UserDTO(String username, String email, String password, Language language, List<Role> roles) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.language = language;
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Language getLanguage() {
        return language;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
