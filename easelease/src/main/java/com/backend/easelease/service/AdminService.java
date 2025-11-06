package com.backend.easelease.service;


import com.backend.easelease.model.Admin;
import com.backend.easelease.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Authenticate admin
    public boolean authenticate(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin != null) {
            return admin.getPassword().equals(password); // hash in production
        }
        return false;
    }

    // Add default admin if none exists
    public void addDefaultAdmin() {
        if (adminRepository.count() == 0) {
            Admin admin = new Admin("admin@gmail.com", "admin123");
            adminRepository.save(admin);
        }
    }
}
