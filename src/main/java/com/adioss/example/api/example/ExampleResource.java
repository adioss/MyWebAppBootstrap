package com.adioss.example.api.example;

import com.adioss.example.domain.Example;
import com.adioss.example.repository.ExampleRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api/example")
public class ExampleResource {
    @Inject
    private ExampleRepository exampleRepository;

    //    @Timed
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> list() {
        List<Example> all = exampleRepository.findAll();
        return new ResponseEntity<>(all, HttpStatus.OK);
    }

    @RequestMapping(value = "/save",
            consumes = {MediaType.APPLICATION_JSON_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE},
            method = RequestMethod.POST)
    public ResponseEntity<?> save(@RequestBody Example example) {
        exampleRepository.save(example);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/load/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> load(@PathVariable("id") String id) {
        Example example = exampleRepository.findOne(id);
        if (example == null) {
            example = new Example();
        }
        return new ResponseEntity<>(example, HttpStatus.OK);
    }

    @RequestMapping(value = "/remove/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> remove(@PathVariable("id") String id) {
        exampleRepository.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
