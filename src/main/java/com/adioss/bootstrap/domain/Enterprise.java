package com.adioss.bootstrap.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
public class Enterprise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = "enterprise.edition.error.name.null")
    @Size(min = 3, max = 120, message = "enterprise.edition.error.name.size")
    private String name;
    @NotNull(message = "enterprise.edition.error.url.null")
    @Size(min = 3, max = 256, message = "enterprise.edition.error.url.size")
    @Pattern(regexp = "(https?://([-\\w\\.]+)+(:\\d+)?(/([\\w/_\\.]*(\\?\\S+)?)?)?)", message = "enterprise.edition.error.url.invalid")
    private String url;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "enterprise")
    private Set<Person> persons;

    public Enterprise() {
    }

    public Enterprise(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public Enterprise(String name, String url, Set<Person> persons) {
        this.name = name;
        this.url = url;
        this.persons = persons;
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

    public Set<Person> getPersons() {
        return persons;
    }

    public void setPersons(Set<Person> persons) {
        this.persons = persons;
    }

    @PreRemove
    private void removePersonsFromEnterprise() {
        for (Person person : getPersons()) {
            person.setEnterprise(null);
        }
    }
}
