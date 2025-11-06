package com.backend.easelease.controller;

import com.backend.easelease.model.Rental;
import com.backend.easelease.repository.RentalRepository;
import com.backend.easelease.service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/rentals")
@CrossOrigin(origins = "http://localhost:5173")
public class RentalController {

    @Autowired
    private RentalService rentalService;



    // Create rental
    @PostMapping("/create")
    public ResponseEntity<Rental> createRental(@RequestBody Rental rentalRequest) {
        Rental rental = rentalService.createRental(
                rentalRequest.getProductId(),
                rentalRequest.getRenterEmail(),
                rentalRequest.getRenterName(),
                rentalRequest.getStartDate(),
                rentalRequest.getEndDate(),
                rentalRequest.getTotalCost() / ((int) (rentalRequest.getEndDate().toEpochDay() - rentalRequest.getStartDate().toEpochDay() + 1)),
                rentalRequest.getPaymentType()
        );
        return ResponseEntity.ok(rental);
    }

    // Get rentals by user
    @GetMapping("/user/{email}")
    public ResponseEntity<List<Rental>> getRentalsByUser(@PathVariable String email) {
        return ResponseEntity.ok(rentalService.getRentalsByRenter(email));
    }

    // Get rentals by product
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rental>> getRentalsByProduct(@PathVariable String productId) {
        return ResponseEntity.ok(rentalService.getRentalsByProduct(productId));
    }

}
