package com.websites.partout.resource;

import com.websites.partout.dao.RolesRepo;
import com.websites.partout.dao.UsersRolesRepo;
import com.websites.partout.model.Roles;
import com.websites.partout.model.User;
import com.websites.partout.model.UsersRoles;
import com.websites.partout.search.GenericSpecification;
import com.websites.partout.search.SearchCriteria;
import com.websites.partout.search.SearchOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/users_roles")
public class UsersRolesResource {
    @Autowired
    UsersRolesRepo usersRolesRepo;

    @Autowired
    RolesRepo rolesRepo;

    @GetMapping
    public List<UsersRoles> rolesList() {
        return usersRolesRepo.findAll();
    }

    @PostMapping(path = "/{id_user}/role/{id_role}")
    @ResponseStatus(HttpStatus.CREATED)
    public void persist(@PathVariable("id_user") final int userId, @PathVariable("id_role") final int roleId) {
        try {
            UsersRoles userRole = new UsersRoles();
            userRole.setFkUserId(userId);
            userRole.setFkRolesId(roleId);
            usersRolesRepo.save(userRole);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete users role information");
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItemById(@PathVariable("id") final int id) {
        try {
            usersRolesRepo.deleteById(id);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid users role id");
        }
    }

    @GetMapping(path = "/{id_user}")
    public List<Roles> getUserRolesByUserId(@PathVariable("id_user") final int userId) {
        // Create an array to store all roles
        List<Roles> roles = new ArrayList<>();
        // Search how many roles does user have by id
        GenericSpecification genericSpecification = new GenericSpecification<UsersRoles>();
        genericSpecification.add(new SearchCriteria("fkUserId", userId, SearchOperation.EQUAL));
        List<UsersRoles> rolesIds = usersRolesRepo.findAll(genericSpecification);
        // Search all the roles by role ids
        if (rolesIds.size() > 0) {
            for (UsersRoles role : rolesIds) {
                genericSpecification = new GenericSpecification<Roles>();
                genericSpecification.add(new SearchCriteria("idUserRoles", role.getFkRolesId(), SearchOperation.EQUAL));
                roles.addAll(rolesRepo.findAll(genericSpecification));
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No roles found");
        }
        return roles;
    }
}
