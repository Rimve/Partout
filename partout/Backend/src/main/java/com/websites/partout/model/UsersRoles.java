package com.websites.partout.model;

import javax.persistence.*;

@Entity
public class UsersRoles {
    @Id
    @Column(name = "fk_user_id")
    private Integer fkUserId;
    @Column(name = "fk_roles_id")
    private Integer fkRolesId;

    public UsersRoles() {
    }

    public int getFkUserId() {
        return fkUserId;
    }

    public void setFkUserId(int fkUserId) {
        this.fkUserId = fkUserId;
    }

    public int getFkRolesId() {
        return fkRolesId;
    }

    public void setFkRolesId(int fkRolesId) {
        this.fkRolesId = fkRolesId;
    }
}
