package com.websites.partout.dao;

import com.websites.partout.model.UsersRoles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRolesRepo extends JpaRepository<UsersRoles, Integer>, JpaSpecificationExecutor<UsersRoles> {

}
