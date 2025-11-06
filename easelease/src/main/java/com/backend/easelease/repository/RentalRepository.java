package com.backend.easelease.repository;

import com.backend.easelease.model.Rental;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends MongoRepository<Rental, String> {
    List<Rental> findByRenterEmail(String email);
    List<Rental> findByProductId(String productId);
}
