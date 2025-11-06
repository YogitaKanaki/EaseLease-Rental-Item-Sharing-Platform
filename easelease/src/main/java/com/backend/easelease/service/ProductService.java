package com.backend.easelease.service;

import com.backend.easelease.model.Product;
import com.backend.easelease.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Product> getRelatedProducts(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getProductsByOwner(String ownerEmail) {
        return productRepository.findByOwnerEmail(ownerEmail);
    }
}
