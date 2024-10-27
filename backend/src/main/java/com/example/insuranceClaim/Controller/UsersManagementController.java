package com.example.insuranceClaim.Controller;

import com.example.insuranceClaim.Dto.ReqRes;
import com.example.insuranceClaim.Model.Users;
import com.example.insuranceClaim.Repo.UsersRepo;
import com.example.insuranceClaim.Service.UsersManagementService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UsersManagementController {
    @Autowired
    private UsersManagementService usersManagementService;

    @PostMapping("/auth/register")
    public ResponseEntity<ReqRes> registerUser(@RequestBody ReqRes data){
        data.setRole("USER");
        return ResponseEntity.ok(usersManagementService.register(data));
    }

    @PostMapping("/organization/admin/register")
    public ResponseEntity<ReqRes> registerAdmin(@RequestBody ReqRes data){
        data.setRole("ADMIN");
        return ResponseEntity.ok(usersManagementService.register(data));
    }

    @DeleteMapping("/organization/admin/delete")
    public ResponseEntity<ReqRes> deleteAdmin(@RequestBody ReqRes data) {
        boolean isDeleted = usersManagementService.deleteAdminByUsername(data.getUsername());

        if (isDeleted) {
            ReqRes response = new ReqRes();
            response.setMessage("Admin deleted successfully.");
            response.setStatusCode(HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } else {
            ReqRes response = new ReqRes();
            response.setMessage("Admin not found.");
            response.setStatusCode(HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @PostMapping("/auth/login")
    public ResponseEntity<ReqRes> login(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.login(req));
    }
    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }
    @Autowired
    private UsersRepo usersRepo;

    @GetMapping("/organization/getUsersCount")
    public long UserCount(){
        return usersRepo.countByRole("USER");
    }
    @GetMapping("/organization/getAgentsCount")
    public long AgentsCount(){
        return usersRepo.countByRole("ADMIN");
    }
    @GetMapping("/organization/getAllUsers")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = usersRepo.findAllByRole("USER");
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
    @GetMapping("/organization/getAllAgents")
    public ResponseEntity<List<Users>> getAllAgents() {
        List<Users> users = usersRepo.findAllByRole("ADMIN");
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }
}
