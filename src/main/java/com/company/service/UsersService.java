package com.company.service;

import com.company.model.User;

public interface UsersService {

    User findByUsername(String username);

    User saveAndFlush(User user);
}
