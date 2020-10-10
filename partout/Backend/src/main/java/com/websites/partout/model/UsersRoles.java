package com.websites.partout.model;

import javax.persistence.*;

@Entity
public class UsersRoles {
    @Id
    @Column(name = "id_users_roles")
    private Integer idUsersRoles;
    @Column(name = "fk_user_id")
    private Integer fkUserId;
    @Column(name = "fk_roles_id")
    private Integer fkRolesId;

    public UsersRoles() {
    }

    public Integer getIdUsersRoles() {
        return idUsersRoles;
    }

    public void setIdUsersRoles(Integer idUsersRoles) {
        this.idUsersRoles = idUsersRoles;
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
