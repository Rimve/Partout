package com.websites.partout.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class ShopOrder {
    @Id
    @Column(name = "id_Order")
    public int id_Order;
    @Column(name = "date")
    public Date date;
    @Column(name = "sum")
    public double sum;
    @Column(name = "status")
    public String status;

    public ShopOrder() {
    }

    public int getId_Order() {
        return id_Order;
    }

    public void setId_Order(int id_Order) {
        this.id_Order = id_Order;
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
}
