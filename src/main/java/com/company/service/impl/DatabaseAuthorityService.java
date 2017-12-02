package com.company.service.impl;

import com.company.model.Authority;
import com.company.repository.AuthorityRepository;
import com.company.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DatabaseAuthorityService implements AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority findByAuthority(String authority) {
        return authorityRepository.findByAuthority(authority);
    }

    @Override
    public Authority saveAndFlush(Authority authority) {
        return authorityRepository.saveAndFlush(authority);
    }
}
