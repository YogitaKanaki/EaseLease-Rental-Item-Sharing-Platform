package com.backend.easelease.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admins")
public class Admin {

    @Id
    private String email;
    private String password; // store hashed password in production

    public Admin() {}

    public Admin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // getters & setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

