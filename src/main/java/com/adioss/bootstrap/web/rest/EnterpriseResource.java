package com.adioss.bootstrap.web.rest;

import com.adioss.bootstrap.domain.Enterprise;
import com.adioss.bootstrap.repository.EnterpriseRepository;
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
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static java.lang.Long.valueOf;

@RestController
@RequestMapping("/api/enterprises")
public class EnterpriseResource extends AbstractResource {
    private final EnterpriseRepository enterpriseRepository;

    @Autowired
    public EnterpriseResource(EnterpriseRepository enterpriseRepository) {
        this.enterpriseRepository = enterpriseRepository;
    }

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<Enterprise>> list(
            @PageableDefault(size = 10, sort = {"name"}, direction = Sort.Direction.ASC) Pageable pageable) {
        return new ResponseEntity<>(enterpriseRepository.findAll(pageable), HttpStatus.OK);
    }

    @RequestMapping(value = "/search/{filter}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Enterprise>> search(@PathVariable("filter") String filter) {
        Iterable<Enterprise> all = enterpriseRepository.findAll();
        List<Enterprise> collect = StreamSupport
                .stream(all.spliterator(), false)
                .filter(enterprise -> enterprise.getName().startsWith(filter))
                .collect(Collectors.toList());
        return new ResponseEntity<>(collect, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Enterprise> retrieve(@PathVariable("id") String id) {
        Enterprise enterprise = enterpriseRepository.findOne(valueOf(id));
        if (enterprise == null) {
            enterprise = new Enterprise();
        }
        return new ResponseEntity<>(enterprise, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> create(@Valid @RequestBody Enterprise enterprise) {
        if (enterprise.getId() != null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        enterpriseRepository.save(enterprise);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.PUT,
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> update(@Valid @RequestBody Enterprise enterprise) {
        if (enterpriseRepository == null) {
            throw new IllegalArgumentException("global.illegal.argument.error");
        }
        enterpriseRepository.save(enterprise);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@PathVariable("id") String id) {
        enterpriseRepository.delete(valueOf(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}