package com.backend.easelease.controller;

import com.backend.easelease.service.AdminService;
import com.backend.easelease.model.User;
import com.backend.easelease.model.Product;
import com.backend.easelease.model.Rental;
import com.backend.easelease.repository.UserRepository;
import com.backend.easelease.repository.ProductRepository;
import com.backend.easelease.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RentalRepository rentalRepository;

    // ✅ Existing Admin Login Endpoint
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        boolean authenticated = adminService.authenticate(email, password);

        Map<String, Object> response = new HashMap<>();
        if (authenticated) {
            response.put("success", true);
            response.put("message", "Login successful");
        } else {
            response.put("success", false);
            response.put("message", "Invalid email or password");
        }

        return response;
    }

    // ✅ New Dashboard Stats Endpoint
    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        List<User> users = userRepository.findAll();
        List<Product> products = productRepository.findAll();
        List<Rental> rentals = rentalRepository.findAll();

        long totalUsers = users.size();
        long totalProducts = products.size();
        long totalRentals = rentals.size();
        long activeRentals = rentals.stream().filter(r -> "ACTIVE".equalsIgnoreCase(r.getStatus())).count();
        long pendingApprovals = rentals.stream().filter(r -> "PENDING".equalsIgnoreCase(r.getStatus())).count();
        long reports = rentals.stream().filter(r -> "REPORTED".equalsIgnoreCase(r.getStatus())).count();

        double revenue = rentals.stream().mapToDouble(Rental::getTotalCost).sum();

        stats.put("totalUsers", totalUsers);
        stats.put("totalProducts", totalProducts);
        stats.put("totalRentals", totalRentals);
        stats.put("activeRentals", activeRentals);
        stats.put("pendingApprovals", pendingApprovals);
        stats.put("reports", reports);
        stats.put("revenue", revenue);

        return stats;
    }
}
