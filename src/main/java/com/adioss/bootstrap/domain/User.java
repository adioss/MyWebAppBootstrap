package com.adioss.bootstrap.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;

    @Column(unique = true)
    @NotNull(message = "user.edition.error.name.null")
    @Size(min = 3, max = 256, message = "user.edition.error.name.size")
    private String username;

    @NotNull(message = "user.edition.error.mail.null")
    @Size(min = 5, max = 256, message = "user.edition.error.mail.size")
    @Pattern(regexp = ".+@.+\\.[a-z]+", message = "user.edition.error.mail.invalid")
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    private Language language;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
    @Column(nullable = false)
    private List<Role> roles;

    public User() {
    }

    public User(String username, String email, String passwordHash, Language language, List<Role> roles) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.language = language;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language != null ? language : Language.ENGLISH;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
