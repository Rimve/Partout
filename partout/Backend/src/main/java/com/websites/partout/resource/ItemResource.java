package com.websites.partout.resource;

import com.websites.partout.dao.ItemRepo;
import com.websites.partout.model.Item;
import com.websites.partout.search.GenericSpecification;
import com.websites.partout.search.SearchCriteria;
import com.websites.partout.search.SearchOperation;
import com.websites.partout.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping
    public List<Item> getAll() {
        return itemRepo.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void persist(@RequestBody final Item item) {
        try {
            itemRepo.save(item);
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bad or incomplete item information");
        }
    }

//    @GetMapping(path = "/{id}")
//    public Item searchItemById(@PathVariable("id") final int id) {
//        Item item = itemRepo.findById(id).orElse(null);
//        if (item != null) {
//            return item;
//        }
//        else {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No item found with id: " + id);
//        }
//    }

    @GetMapping(path = "/{category}")
    public List<Item> searchItemByCat(@PathVariable("category") final String category) {
        GenericSpecification genericSpecification = new GenericSpecification<Item>();
        genericSpecification.add(new SearchCriteria("category", category, SearchOperation.EQUAL));
        List<Item> items = itemRepo.findAll(genericSpecification);
        // Search all the roles by role ids
        return items;
    }

    @GetMapping(path = "/search/{name}")
    public List<Item> searchItemByName(@PathVariable("name") final String name) {
        GenericSpecification genericSpecification = new GenericSpecification<Item>();
        genericSpecification.add(new SearchCriteria("name", name, SearchOperation.MATCH));
        List<Item> items = itemRepo.findAll(genericSpecification);
        // Search all the roles by role ids
        return items;
    }

    @DeleteMapping(path = "/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItemById(@PathVariable("id") final int id, @RequestHeader("Authorization") HttpHeaders headers) {
        try {
            final List<String> token = headers.get("Authorization");
            if (token.get(0).startsWith("Bearer ")) {
                String jwt = token.get(0).substring(6);
                Item item = itemRepo.findById(id).orElse(null);
                int callerId = jwtUtil.extractCallerId(jwt);
                if (item != null && item.fk_user_id == callerId) {
                    itemRepo.deleteById(id);
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only delete your own items");
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
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}")
    public Optional<Item> updateItemById(@PathVariable("id") final int id, @RequestBody final Item item, @RequestHeader("Authorization") HttpHeaders headers) {
        Optional<Item> tempItem = itemRepo.findById(id);
        if (tempItem.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid item id");
        }
        else {
            final List<String> token = headers.get("Authorization");
            if (token.get(0).startsWith("Bearer ")) {
                String jwt = token.get(0).substring(6);
                Item itemTemp = itemRepo.findById(id).orElse(null);
                int callerId = jwtUtil.extractCallerId(jwt);
                if (itemTemp != null && itemTemp.fk_user_id == callerId) {
                    itemRepo.findById(id).map(u -> {
                        int indexOfItem = u.getId_Item();
                        if (indexOfItem > 0) {
                            try {
                                itemRepo.deleteById(indexOfItem);
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
                } else {
                    throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update your own items");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You have not logged in");
            }
            throw new ResponseStatusException(HttpStatus.FOUND);
        }
    }
}
