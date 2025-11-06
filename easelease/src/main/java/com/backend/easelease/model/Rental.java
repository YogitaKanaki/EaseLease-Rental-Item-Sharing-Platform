package com.backend.easelease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document(collection = "rentals")
public class Rental {

    @Id
    private String id;

    private String productId;
    private String renterEmail;
    private String renterName;
    private LocalDate startDate;  // ✅ Use LocalDate
    private LocalDate endDate;    // ✅ Use LocalDate
    private int totalDays;
    private double totalCost;
    private String paymentType;
    private String status; // ACTIVE, COMPLETED, PENDING, REPORTED

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getRenterEmail() { return renterEmail; }
    public void setRenterEmail(String renterEmail) { this.renterEmail = renterEmail; }

    public String getRenterName() { return renterName; }
    public void setRenterName(String renterName) { this.renterName = renterName; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public int getTotalDays() { return totalDays; }
    public void setTotalDays(int totalDays) { this.totalDays = totalDays; }

    public double getTotalCost() { return totalCost; }
    public void setTotalCost(double totalCost) { this.totalCost = totalCost; }

    public String getPaymentType() { return paymentType; }
    public void setPaymentType(String paymentType) { this.paymentType = paymentType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
