package com.adioss.bootstrap.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping(value = {"/", "/enterprise/**", "/person/**", "/user/**", "/profile/**"})
    public String index() {
        return "index";
    }
}
