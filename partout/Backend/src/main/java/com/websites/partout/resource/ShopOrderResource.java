package com.websites.partout.resource;

import com.websites.partout.dao.ShopOrderRepo;
import com.websites.partout.model.ShopOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/orders")
public class ShopOrderResource {

    @Autowired
    ShopOrderRepo shopOrderRepo;

    @GetMapping
    public List<ShopOrder> getAll() {
        return shopOrderRepo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void persist(@RequestBody final ShopOrder shopOrder) {
        try {
            shopOrderRepo.save(shopOrder);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete order information");
        }
    }

    @GetMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void searchOrderById(@PathVariable("id") final int id) {
        try {
            shopOrderRepo.deleteById(id);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid order id");
        }
    }

    @DeleteMapping(path = "/{id}")
    public Optional<ShopOrder> deleteOrderById(@PathVariable("id") final int id) {
        Optional<ShopOrder> order = shopOrderRepo.findById(id);
        shopOrderRepo.deleteById(id);
        return order;
    }

    @PutMapping(path = "/{id}")
    public Optional<ShopOrder> updateUserById(@PathVariable("id") final int id, @RequestBody final ShopOrder order) {
        Optional<ShopOrder> tempOrder = shopOrderRepo.findById(id);
        if (tempOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order id");
        }
        else {
            shopOrderRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_shop_order();
                if (indexOfUser > 0) {
                    try {
                        shopOrderRepo.deleteById(indexOfUser);
                        order.setId_shop_order(id);
                        return shopOrderRepo.save(order);
                    }
                    catch (Exception ex) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order id");
                    }
                }
                else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order id");
                }
            });
            throw new ResponseStatusException(HttpStatus.FOUND);
        }
    }
}
