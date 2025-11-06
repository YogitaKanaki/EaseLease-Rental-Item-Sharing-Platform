package com.backend.easelease.controller;

import com.backend.easelease.model.User;
import com.backend.easelease.service.UserService;
import org.springframework.http.ResponseEntity;
import java.util.Base64;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Get user by email
    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        Optional<User> userOpt = userService.getUserByEmail(email);
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(404).body("User not found");
    }


    // Update user profile
    @PostMapping("/{email}/update")
    public ResponseEntity<?> updateProfile(
            @PathVariable String email,
            @RequestParam String name,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam(required = false) MultipartFile profileImage
    ) {
        try {
            Optional<User> userOpt = userService.getUserByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }
            User user = userOpt.get();

            String imageBase64 = null;
            if (profileImage != null && !profileImage.isEmpty()) {
                byte[] bytes = profileImage.getBytes();
                imageBase64 = Base64.getEncoder().encodeToString(bytes);

            }

            User updatedUser = userService.updateUser(user, new User() {{
                setName(name);
                setPhone(phone);
                setAddress(address);
            }}, imageBase64);

            return ResponseEntity.ok(updatedUser);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to update profile");
        }
    }
}
