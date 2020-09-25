package com.websites.partout.resource;

import com.websites.partout.dao.ShopOrderRepo;
import com.websites.partout.model.ShopOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<ShopOrder> persist(@RequestBody final ShopOrder shopOrder) {
        shopOrderRepo.save(shopOrder);
        return shopOrderRepo.findAll();
    }

    @GetMapping(path = "/{id}")
    public Optional<ShopOrder> searchOrderById(@PathVariable("id") final int id) {
        return shopOrderRepo.findById(id);
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
            return tempOrder;
        }
        else {
            shopOrderRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_Order();
                if (indexOfUser > 0) {
                    shopOrderRepo.deleteById(indexOfUser);
                    order.setId_Order(id);
                    shopOrderRepo.save(order);
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return shopOrderRepo.findById(id);
        }
    }
}
