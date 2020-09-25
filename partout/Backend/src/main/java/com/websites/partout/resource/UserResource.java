package com.websites.partout.resource;

import com.websites.partout.dao.UserRepo;
import com.websites.partout.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users")
public class UserResource {

    @Autowired
    UserRepo userRepo;

    @GetMapping
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @PostMapping
    public List<User> insertUser(@RequestBody final User user) {
        userRepo.save(user);
        return userRepo.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<User> searchUserById(@PathVariable("id") final int id) {
        return userRepo.findById(id);
    }

    @DeleteMapping(path = "/{id}")
    public Optional<User> deleteUserById(@PathVariable("id") final int id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isEmpty()) {
            return user;
        }
        else {
            userRepo.deleteById(id);
            return user;
        }
    }

    @PutMapping(path = "/{id}")
    public Optional<User> updateUserById(@PathVariable("id") final int id, @RequestBody final User user) {
        Optional<User> tempUser = userRepo.findById(id);
        if (tempUser.isEmpty()) {
            return tempUser;
        }
        else {
            userRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_User();
                if (indexOfUser > 0) {
                    userRepo.deleteById(indexOfUser);
                    user.setId_User(id);
                    userRepo.save(user);
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return userRepo.findById(id);
        }
    }
}
