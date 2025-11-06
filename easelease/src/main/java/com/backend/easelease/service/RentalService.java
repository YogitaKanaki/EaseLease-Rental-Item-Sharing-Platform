package com.backend.easelease.service;

import com.backend.easelease.model.Rental;
import com.backend.easelease.repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    // Create rental
    public Rental createRental(String productId, String renterEmail, String renterName,
                               LocalDate startDate, LocalDate endDate, double pricePerDay, String paymentType) {

        int totalDays = (int) ChronoUnit.DAYS.between(startDate, endDate) + 1;
        double totalCost = totalDays * pricePerDay;

        Rental rental = new Rental();
        rental.setProductId(productId);
        rental.setRenterEmail(renterEmail);
        rental.setRenterName(renterName);
        rental.setStartDate(startDate);
        rental.setEndDate(endDate);
        rental.setTotalDays(totalDays);
        rental.setTotalCost(totalCost);
        rental.setPaymentType(paymentType);

        return rentalRepository.save(rental);
    }

    // Rentals by renter
    public List<Rental> getRentalsByRenter(String email) {
        return rentalRepository.findByRenterEmail(email);
    }

    // Rentals by product
    public List<Rental> getRentalsByProduct(String productId) {
        return rentalRepository.findByProductId(productId);
    }
}
