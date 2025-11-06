package com.backend.easelease.controller;

import com.backend.easelease.model.Product;
import com.backend.easelease.model.Rental;
import com.backend.easelease.repository.ProductRepository;
import com.backend.easelease.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/items")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class AdminItemController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RentalRepository rentalRepository;

    // ✅ Get all items with additional info (times rented)
    @GetMapping
    public List<Map<String, Object>> getAllItems() {
        List<Product> products = productRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Product product : products) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", product.get_id());
            item.put("title", product.getName());
            item.put("category", product.getCategory());
            item.put("owner", product.getOwner());
            item.put("ownerEmail", product.getOwnerEmail());
            item.put("price", "₹" + product.getPricePerDay() + "/day");
            item.put("availability", product.getAvailableFrom() + " to " + product.getAvailableTo());
            item.put("image", (product.getImages() != null && !product.getImages().isEmpty())
                    ? product.getImages().get(0)
                    : "https://via.placeholder.com/60");
            item.put("status", "Active"); // You can add approval logic later
            item.put("timesRented", rentalRepository.findByProductId(product.get_id()).size());
            item.put("reports", 0); // Add reporting later

            response.add(item);
        }

        return response;
    }

    // ✅ Get a specific item by ID
    @GetMapping("/{id}")
    public Optional<Product> getItemById(@PathVariable String id) {
        return productRepository.findById(id);
    }

    // ✅ Delete an item (if admin removes it)
    @DeleteMapping("/{id}")
    public Map<String, String> deleteItem(@PathVariable String id) {
        productRepository.deleteById(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Item deleted successfully");
        return response;
    }
}
