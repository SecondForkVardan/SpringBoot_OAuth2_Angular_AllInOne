package com.company.service;

import com.company.model.Authority;

public interface AuthorityService {

    Authority findByAuthority(String authority);

    Authority saveAndFlush(Authority authority);
}
