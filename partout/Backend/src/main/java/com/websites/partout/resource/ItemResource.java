package com.websites.partout.resource;

import com.websites.partout.dao.ItemRepo;
import com.websites.partout.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "/api/items")
public class ItemResource {

    @Autowired
    ItemRepo itemRepo;

    @GetMapping
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void persist(@RequestBody final Item order) {
        try {
            itemRepo.save(order);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete item information");
        }
    }

    @GetMapping(path = "/{id}")
    public Item searchItemById(@PathVariable("id") final int id) {
        Item item = itemRepo.findById(id).orElse(null);
        if (item != null) {
            return item;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No item found with id: " + id);
        }
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItemById(@PathVariable("id") final int id) {
        try {
            itemRepo.deleteById(id);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid item id");
        }
    }

    @PutMapping(path = "/{id}")
    public Optional<Item> updateUserById(@PathVariable("id") final int id, @RequestBody final Item item) {
        Optional<Item> tempItem = itemRepo.findById(id);
        if (tempItem.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid item id");
        }
        else {
            itemRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_Item();
                if (indexOfUser > 0) {
                    try {
                    itemRepo.deleteById(indexOfUser);
                    item.setId_Item(id);
                    return itemRepo.save(item);
                    }
                    catch (Exception ex) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid item id");
                    }
                }
                else {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid item id");
                }
            });
            throw new ResponseStatusException(HttpStatus.FOUND);
        }
    }
}
