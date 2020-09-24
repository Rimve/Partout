package com.websites.partout.resource;

import com.websites.partout.dao.ItemRepo;
import com.websites.partout.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/items")
public class ItemResource {

    @Autowired
    ItemRepo itemRepo;

    @GetMapping(value = "/all")
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    @PostMapping(value = "/load")
    public List<Item> persist(@RequestBody final Item order) {
        itemRepo.save(order);
        return itemRepo.findAll();
    }

    @GetMapping(path = "/search/{id}")
    public Optional<Item> searchItemById(@PathVariable("id") final int id) {
        return itemRepo.findById(id);
    }

    @GetMapping(path = "/delete/{id}")
    public Optional<Item> deleteItemById(@PathVariable("id") final int id) {
        Optional<Item> item = itemRepo.findById(id);
        if (item.isEmpty()) {
            return item;
        }
        else {
            itemRepo.deleteById(id);
            return item;
        }
    }

    @PostMapping(path = "/update/{id}")
    public Optional<Item> updateUserById(@PathVariable("id") final int id, @RequestBody final Item item) {
        Optional<Item> tempItem = itemRepo.findById(id);
        if (tempItem.isEmpty()) {
            return tempItem;
        }
        else {
            itemRepo.findById(id).map(u -> {
                int indexOfUser = u.getId_Item();
                if (indexOfUser > 0) {
                    itemRepo.deleteById(indexOfUser);
                    item.setId_Item(id);
                    itemRepo.save(item);
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return itemRepo.findById(id);
        }
    }
}
