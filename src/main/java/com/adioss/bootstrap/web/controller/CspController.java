package com.adioss.bootstrap.web.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cspReport")
public class CspController {
    private static final Logger log = LoggerFactory.getLogger(CspController.class);

    @RequestMapping(method = RequestMethod.POST, consumes = {MediaType.ALL_VALUE})
    public ResponseEntity<HttpStatus> cspReport(@RequestBody String cspReport) {
        log.error("CSP error: \n" + cspReport);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
