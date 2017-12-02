package com.company.controller;

import com.company.model.User;
import com.company.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class HelloController {

    @Autowired
    private UsersService usersService;

    @GetMapping(value = "/api/hello")
    public String hello() {
        return "Hello authenticated user !";
    }

    @PreAuthorize("#oauth2.hasScope('read')")
    @GetMapping(value = "/api/me")
    public ResponseEntity<?> authenticatedUser(Principal principal){
        User authenticatedUser = usersService.findByUsername(principal.getName());

        if(authenticatedUser == null){
            return new ResponseEntity<>("Are You authenticated ?", HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
        }
    }
}
