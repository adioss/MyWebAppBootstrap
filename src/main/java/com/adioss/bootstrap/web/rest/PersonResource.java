package com.adioss.bootstrap.web.rest;

import javax.validation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.adioss.bootstrap.domain.Person;
import com.adioss.bootstrap.repository.PersonRepository;

import static java.lang.Long.valueOf;

@RestController
@RequestMapping("/api/persons")
public class PersonResource extends AbstractResource {
    private final PersonRepository personRepository;

    @Autowired
    public PersonResource(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Person>> list(@PageableDefault(size = 10, sort = {"name"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(personRepository.findAll(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Person> retrieve(@PathVariable("id") String id) {
        Person person = personRepository.findOne(valueOf(id));
        if (person == null) {
            person = new Person();
        }
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<HttpStatus> create(@Valid @RequestBody Person person) {
        if (person.getId() != null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        personRepository.save(person);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<HttpStatus> update(@Valid @RequestBody Person person) {
        if (person.getId() == null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        personRepository.save(person);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        personRepository.delete(valueOf(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
