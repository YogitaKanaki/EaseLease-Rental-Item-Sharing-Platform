package com.backend.easelease.repository;

import com.backend.easelease.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByOwnerEmail(String ownerEmail);
    List<Product> findByCategory(String category);
}