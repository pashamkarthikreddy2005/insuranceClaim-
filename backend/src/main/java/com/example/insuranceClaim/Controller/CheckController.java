package com.example.insuranceClaim.Controller;

import com.example.insuranceClaim.Model.HasPolicy;
import com.example.insuranceClaim.Model.Users;
import com.example.insuranceClaim.Repo.CheckRepo;
import com.example.insuranceClaim.Repo.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class CheckController {

    @Autowired
    private CheckRepo checkRepo;

    @Autowired
    private UsersRepo usersRepo;

    @GetMapping("/user/hasBike")
    private ResponseEntity<?> hasBike(Principal principal) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        HasPolicy hasPolicy = checkRepo.findByUser(user);
        if (hasPolicy != null && hasPolicy.isHasBike()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/user/hasCar")
    private ResponseEntity<?> hasCar(Principal principal) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        HasPolicy hasPolicy = checkRepo.findByUser(user);
        if (hasPolicy != null && hasPolicy.isHasCar()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/user/hasHealth")
    private ResponseEntity<?> hasHealth(Principal principal) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        HasPolicy hasPolicy = checkRepo.findByUser(user);
        if (hasPolicy != null && hasPolicy.isHasHealth()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/user/hasLife")
    private ResponseEntity<?> hasLife(Principal principal) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        HasPolicy hasPolicy = checkRepo.findByUser(user);
        if (hasPolicy != null && hasPolicy.isHasLife()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
    @GetMapping("/user/hasHome")
    private ResponseEntity<?> hasHome(Principal principal) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        HasPolicy hasPolicy = checkRepo.findByUser(user);
        if (hasPolicy != null && hasPolicy.isHasHome()) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
    }
}
