package com.websites.partout.dao;

import com.websites.partout.model.ShopOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopOrderRepo extends JpaRepository<ShopOrder, Integer> {

}
