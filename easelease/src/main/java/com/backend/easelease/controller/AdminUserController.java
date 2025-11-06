package com.backend.easelease.controller;

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
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RentalRepository rentalRepository;

    // ✅ Get all users with summary (items listed, rentals made)
    @GetMapping
    public List<Map<String, Object>> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (User user : users) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", user.getId());
            userData.put("name", user.getName());
            userData.put("email", user.getEmail());
            //userData.put("joinedDate", user.getCreatedAt());
            userData.put("profileImage", user.getProfileImage());

            // Fetch user’s products and rentals using email
            List<Product> products = productRepository.findByOwnerEmail(user.getEmail());
            List<Rental> rentals = rentalRepository.findByRenterEmail(user.getEmail());

            userData.put("itemsListed", products.size());
            userData.put("rentalsMade", rentals.size());

            result.add(userData);
        }
        return result;
    }

    // ✅ Get full profile of one user (for View Profile button)
    @GetMapping("/{id}")
    public Map<String, Object> getUserProfile(@PathVariable String id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return Map.of("error", "User not found");
        }

        User user = userOpt.get();
        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("name", user.getName());
        profile.put("email", user.getEmail());
        //profile.put("joinedDate", user.getCreatedAt());
        profile.put("profileImage", user.getProfileImage());

        // Fetch details from other collections using user’s email
        List<Product> products = productRepository.findByOwnerEmail(user.getEmail());
        List<Rental> rentals = rentalRepository.findByRenterEmail(user.getEmail());

        profile.put("items", products);
        profile.put("rentals", rentals);

        return profile;
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        userRepository.deleteById(id);
        return "User deleted successfully";
    }
}
