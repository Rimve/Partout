package com.websites.partout.resource;

import com.websites.partout.model.User;
import com.websites.partout.search.GenericSpecification;
import com.websites.partout.search.SearchCriteria;
import com.websites.partout.search.SearchOperation;
import com.websites.partout.dao.ShopOrderRepo;
import com.websites.partout.dao.UserRepo;
import com.websites.partout.model.ShopOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/users")
public class UserResource {

    @Autowired
    UserRepo userRepo;
    @Autowired
    ShopOrderRepo orderRepo;

    @GetMapping
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void insertUser(@RequestBody final User user) {
        try {
            userRepo.save(user);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete user information");
        }
    }

    @GetMapping(path = "/{id}")
    public User searchUserById(@PathVariable("id") final int id) {
        User user = userRepo.findById(id).orElse(null);
        if (user != null) {
            return user;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found with id: " + id);
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable("id") final int id) {
        try {
            userRepo.deleteById(id);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid user id");
        }
    }

    @PutMapping(path = "/{id}")
    public Optional<User> updateUserById(@PathVariable("id") final int id, @RequestBody final User user) {
        Optional<User> tempUser = userRepo.findById(id);
        if (tempUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user id");
        }
        else {
            userRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_User();
                if (indexOfUser > 0) {
                    try {
                        userRepo.deleteById(indexOfUser);
                        user.setId_User(id);
                        return userRepo.save(user);
                    }
                    catch (Exception ex) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user id");
                    }
                }
                else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid user id");
                }
            });
            throw new ResponseStatusException(HttpStatus.FOUND);
        }
    }

    @GetMapping(path = "/{id_user}/orders")
    public List<ShopOrder> updateUserById(@PathVariable("id_user") final int userId) {
        Optional<User> tempUser = userRepo.findById(userId);
        if (tempUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected user does not exist");
        }
        else {
            try {
                GenericSpecification genericSpecification = new GenericSpecification<ShopOrder>();
                genericSpecification.add(new SearchCriteria("fk_user_id", userId, SearchOperation.EQUAL));
                return orderRepo.findAll(genericSpecification);
            } catch (Exception ex) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected user does not have any orders");
            }
        }
    }

    @GetMapping(path = "/{id_user}/orders/{id_order}")
    public List<ShopOrder> updateUserById(@PathVariable("id_user") final int userId, @PathVariable("id_order") final int orderId) {
        Optional<User> tempUser = userRepo.findById(userId);
        if (tempUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected user does not exist");
        }
        else {
            try {
                GenericSpecification genericSpecification = new GenericSpecification<ShopOrder>();
                genericSpecification.add(new SearchCriteria("fk_user_id", userId, SearchOperation.EQUAL));
                genericSpecification.add(new SearchCriteria("id_shop_order", orderId, SearchOperation.EQUAL));
                List<ShopOrder> orders = orderRepo.findAll(genericSpecification);
                if (orders.isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected user does not have any orders with id: " + orderId);
                }
                else {
                    return orders;
                }
            }
            catch (Exception ex) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Selected user does not have any orders with id: " + orderId);
            }
        }
    }
}
