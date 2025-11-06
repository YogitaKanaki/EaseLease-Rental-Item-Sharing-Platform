package com.backend.easelease.controller;

import com.backend.easelease.model.Rental;
import com.backend.easelease.model.Product;
import com.backend.easelease.repository.RentalRepository;
import com.backend.easelease.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // adjust to your React port
public class AdminRentalController {

    @Autowired
    private RentalRepository rentalRepo;

    @Autowired
    private ProductRepository productRepo;

    @GetMapping("/rentals")
    public List<Map<String, Object>> getAllRentals() {
        List<Rental> rentals = rentalRepo.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Rental rental : rentals) {
            Map<String, Object> data = new HashMap<>();
            data.put("id", rental.getId());
            data.put("renterName", rental.getRenterName());
            data.put("renterEmail", rental.getRenterEmail());
            data.put("startDate", rental.getStartDate());
            data.put("endDate", rental.getEndDate());
            data.put("totalCost", rental.getTotalCost());
            data.put("paymentType", rental.getPaymentType());
            data.put("status", rental.getStatus());

            Product product = productRepo.findById(rental.getProductId()).orElse(null);
            if (product != null) {
                data.put("productName", product.getName());
                data.put("owner", product.getOwner());
                data.put("ownerEmail", product.getOwnerEmail());
            }

            result.add(data);
        }

        return result;
    }
}
