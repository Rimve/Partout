package com.websites.partout.resource;

import com.websites.partout.dao.RolesRepo;
import com.websites.partout.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(value = "/api/roles")
public class RolesResource {

    @Autowired
    RolesRepo rolesRepo;

    @GetMapping
    public List<Roles> rolesList() {
        return rolesRepo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void persist(@RequestBody final Roles role) {
        try {
            rolesRepo.save(role);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete role information");
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItemById(@PathVariable("id") final int id) {
        try {
            rolesRepo.deleteById(id);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid role id");
        }
    }
}
