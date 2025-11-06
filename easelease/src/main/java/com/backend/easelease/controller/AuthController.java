package com.backend.easelease.controller;

import com.backend.easelease.model.User;
import com.backend.easelease.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody User user) {
        userService.register(user);
        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/login")
    public Object login(@RequestBody Map<String, String> loginData) {
        Optional<User> user = userService.login(loginData.get("email"), loginData.get("password"));
        if (user.isPresent()) {
            User u = user.get();
            return Map.of("email", u.getEmail(), "name", u.getName());
        }
        return Map.of("error", "Invalid credentials");
    }

    @PostMapping("/forgot-password")
    public Map<String, String> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("newPassword");
        userService.resetPassword(email, newPassword);
        return Map.of("message", "Password updated successfully");
    }
}
