package com.websites.partout.model;

import javax.persistence.*;

@Entity
public class Roles {
    @Id
    @Column(name = "id_user_roles")
    private Integer idUserRoles;
    @Column(name = "role")
    private String role;

    public Roles() {
    }

    public int getIdUserRoles() {
        return idUserRoles;
    }

    public void setIdUserRoles(int idUserRoles) {
        this.idUserRoles = idUserRoles;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
