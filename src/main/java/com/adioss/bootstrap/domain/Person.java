package com.adioss.bootstrap.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Entity
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = "person.edition.error.name.null")
    @Size(min = 3, max = 120, message = "person.edition.error.name.size")
    private String name;
    @NotNull(message = "person.edition.error.url.null")
    @Size(min = 3, max = 120, message = "person.edition.error.url.size")
    @Pattern(regexp = "(https?://([-\\w\\.]+)+(:\\d+)?(/([\\w/_\\.]*(\\?\\S+)?)?)?)", message = "person.edition.error.url.invalid")
    private String url;
    @ManyToOne()
    private Enterprise enterprise;

    public Person() {
    }

    public Person(String name, String url, Enterprise enterprise) {
        this.name = name;
        this.url = url;
        this.enterprise = enterprise;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Enterprise getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(Enterprise enterprise) {
        this.enterprise = enterprise;
    }
}
