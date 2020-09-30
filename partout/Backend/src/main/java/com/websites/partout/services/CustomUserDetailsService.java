package com.websites.partout.services;

import com.websites.partout.dao.UserRepo;
import com.websites.partout.model.User;
import com.websites.partout.search.GenericSpecification;
import com.websites.partout.search.SearchCriteria;
import com.websites.partout.search.SearchOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return searchUserByUsername(username).get();
    }

    private Optional<User> searchUserByUsername(String username) {
        try {
            GenericSpecification genericSpecification = new GenericSpecification<User>();
            genericSpecification.add(new SearchCriteria("username", username, SearchOperation.EQUAL));
            Optional<User> userOptional = userRepo.findOne(genericSpecification);
            if (userOptional.isPresent()) {
                return userOptional;
            }
            else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user is present");
            }
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found", ex);
        }
    }
}
