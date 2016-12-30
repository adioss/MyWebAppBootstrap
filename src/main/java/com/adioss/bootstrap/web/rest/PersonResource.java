package com.adioss.bootstrap.web.rest;

import com.adioss.bootstrap.domain.Person;
import com.adioss.bootstrap.repository.PersonRepository;
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
    public ResponseEntity<Page<Person>> list(
            @PageableDefault(size = 10, sort = {"name"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(personRepository.findAll(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> retrieve(@PathVariable("id") String id) {
        Person person = personRepository.findOne(valueOf(id));
        if (person == null) {
            person = new Person();
        }
        return new ResponseEntity<>(person, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> create(@Valid @RequestBody Person person) {
        if (person.getId() != null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        personRepository.save(person);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> update(@Valid @RequestBody Person person) {
        if (person.getId() == null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        personRepository.save(person);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        personRepository.delete(valueOf(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
