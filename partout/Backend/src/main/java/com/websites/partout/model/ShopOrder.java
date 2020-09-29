package com.websites.partout.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class ShopOrder {
    @Id
    @Column(name = "id_shop_order")
    public int id_shop_order;
    @Column(name = "date")
    public Date date;
    @Column(name = "sum")
    public double sum;
    @Column(name = "status")
    public String status;
    @Column(name = "fk_user_id")
    public Integer fk_user_id;

    public ShopOrder() {
    }

    public int getId_shop_order() {
        return id_shop_order;
    }

    public void setId_shop_order(int id_shop_order) {
        this.id_shop_order = id_shop_order;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getSum() {
        return sum;
    }

    public void setSum(double sum) {
        this.sum = sum;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getFk_user_id() {
        return fk_user_id;
    }

    public void setFk_user_id(Integer fk_user_id) {
        this.fk_user_id = fk_user_id;
    }
}
