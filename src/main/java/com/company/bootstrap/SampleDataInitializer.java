package com.company.bootstrap;

import com.company.model.Authority;
import com.company.model.User;
import com.company.service.AuthorityService;
import com.company.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class SampleDataInitializer implements ApplicationListener<ContextRefreshedEvent>{

    private static final String USERNAME = "username";
    private static final String PASSWORD = "password";
    private static final String AUTHORITY_USER = "USER";


    @Autowired
    private UsersService usersService;

    @Autowired
    private AuthorityService authorityService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        seedData();
    }

    private void seedData() {
        saveAuthority();
        saveUser();
        saveUsersAuthorities();
    }

    private void saveUsersAuthorities() {
        User user = usersService.findByUsername(USERNAME);
        Authority authority = authorityService.findByAuthority(AUTHORITY_USER);

        Set<Authority> authorities = new HashSet<>();
        authorities.add(authority);

        user.setAuthorities(authorities);
        usersService.saveAndFlush(user);
    }

    private void saveAuthority() {
        if(authorityService.findByAuthority(AUTHORITY_USER) == null){
            Authority authority = createAuthority();
            authorityService.saveAndFlush(authority);
        }
    }

    private void saveUser() {
        if(usersService.findByUsername(USERNAME) == null){
            User user = createUser();
            usersService.saveAndFlush(user);
        }
    }

    private User createUser() {
        User user = new User();
        user.setUsername(USERNAME);
        user.setPassword(PASSWORD);

        return user;
    }

    private Authority createAuthority() {
        Authority authority = new Authority();
        authority.setAuthority(AUTHORITY_USER);

        return authority;
    }

}
