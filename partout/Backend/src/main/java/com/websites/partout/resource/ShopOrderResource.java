package com.websites.partout.resource;

import com.websites.partout.dao.ShopOrderRepo;
import com.websites.partout.model.ShopOrder;
import com.websites.partout.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

    @Autowired
    JwtUtil jwtUtil;

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
    @ResponseStatus(HttpStatus.FOUND)
    public ShopOrder searchOrderById(@PathVariable("id") final int id, @RequestHeader("Authorization") HttpHeaders headers) {
        try {
            final List<String> token = headers.get("Authorization");
            if (token.get(0).startsWith("Bearer ")) {
                String jwt = token.get(0).substring(6);
                ShopOrder order = shopOrderRepo.findById(id).orElse(null);
                int callerId = jwtUtil.extractCallerId(jwt);
                if (order != null && order.fk_user_id == callerId) {
                    return order;
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only search your own orders");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have not logged in");
            }
        }
        catch (ResponseStatusException ex) {
            throw new ResponseStatusException(ex.getStatus(), ex.getReason());
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ShopOrder deleteOrderById(@PathVariable("id") final int id, @RequestHeader("Authorization") HttpHeaders headers) {
        try {
            final List<String> token = headers.get("Authorization");
            if (token.get(0).startsWith("Bearer ")) {
                String jwt = token.get(0).substring(6);
                ShopOrder order = shopOrderRepo.findById(id).orElse(null);
                int callerId = jwtUtil.extractCallerId(jwt);
                if (order != null && order.fk_user_id == callerId) {
                    shopOrderRepo.deleteById(id);
                    return order;
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own orders");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have not logged in");
            }
        }
        catch (ResponseStatusException ex) {
            throw new ResponseStatusException(ex.getStatus(), ex.getReason());
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path = "/{id}")
    public Optional<ShopOrder> updateOrderById(@PathVariable("id") final int id, @RequestBody final ShopOrder order, @RequestHeader("Authorization") HttpHeaders headers) {
        Optional<ShopOrder> tempOrder = shopOrderRepo.findById(id);
        if (tempOrder.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid order id");
        }
        else {
            final List<String> token = headers.get("Authorization");
            if (token.get(0).startsWith("Bearer ")) {
                String jwt = token.get(0).substring(6);
                ShopOrder orderTemp = shopOrderRepo.findById(id).orElse(null);
                int callerId = jwtUtil.extractCallerId(jwt);
                if (orderTemp != null && orderTemp.fk_user_id == callerId) {
                    shopOrderRepo.findById(id).map(u -> {
                        int indexOfOrder = u.getId_shop_order();
                        if (indexOfOrder > 0) {
                            try {
                                shopOrderRepo.deleteById(indexOfOrder);
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
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own orders");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have not logged in");
            }
            throw new ResponseStatusException(HttpStatus.FOUND);
        }
    }
}
