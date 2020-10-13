package com.websites.partout.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Item {
    @Id
    @Column(name = "id_Item")
    public int id_Item;
    @Column(name = "name")
    public String name;
    @Column(name = "price")
    public Double price;
    @Column(name = "quantity")
    public int quantity;
    @Column(name = "description")
    public String description;
    @Column(name = "category")
    public String category;
    @Column(name = "fk_shop_order_id")
    public Integer fk_shop_order_id;
    @Column(name = "fk_user_id")
    public Integer fk_user_id;

    public Item() {
    }

    public int getId_Item() {
        return id_Item;
    }

    public void setId_Item(int id_Item) {
        this.id_Item = id_Item;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getFk_shop_order_id() {
        return fk_shop_order_id;
    }

    public void setFk_shop_order_id(Integer fk_shop_order_id) {
        this.fk_shop_order_id = fk_shop_order_id;
    }

    public Integer getFk_user_id() {
        return fk_user_id;
    }

    public void setFk_user_id(Integer fk_user_id) {
        this.fk_user_id = fk_user_id;
    }
}
