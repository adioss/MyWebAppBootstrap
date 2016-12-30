package com.adioss.bootstrap.web.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

class AbstractResource {
    @ExceptionHandler({IllegalArgumentException.class})
    void handleBadRequests(HttpServletResponse response, WebRequest request) throws IOException {
        response.sendError(HttpStatus.BAD_REQUEST.value());
    }
}
