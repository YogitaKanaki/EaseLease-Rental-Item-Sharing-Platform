package com.backend.easelease.controller;

import com.backend.easelease.model.Product;
import com.backend.easelease.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Vite frontend
@RestController
@RequestMapping("/api/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable String id) {
        return productService.getProductById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @GetMapping("/related/{category}")
    public List<Product> getRelatedProducts(@PathVariable String category) {
        return productService.getRelatedProducts(category);
    }

    @GetMapping("/owner/{ownerEmail}")
    public List<Product> getProductsByOwner(@PathVariable String ownerEmail) {
        return productService.getProductsByOwner(ownerEmail);
    }

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
}
