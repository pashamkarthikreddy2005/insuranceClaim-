package com.example.insuranceClaim.Controller;

import com.example.insuranceClaim.Model.*;
import com.example.insuranceClaim.Repo.*;
import com.example.insuranceClaim.Service.ClaimsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
public class ClaimsController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private ClaimRepo claimRepo;

    @Autowired
    private BikeClaimsRepo bikeClaimsRepo;

    @PostMapping("/user/new-claim/bike-claim")
    public ResponseEntity<?> addNewBikeClaim(@ModelAttribute BikeClaims claim, Principal principal, @RequestParam("file") MultipartFile file) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElseThrow();
        InsuranceClaims insuranceClaim = new InsuranceClaims();
        insuranceClaim.setClaimType("Bike");
        insuranceClaim.setClaimStatus("Pending");
        insuranceClaim.setUser(user);
        claimRepo.save(insuranceClaim);

        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        File destination = new File(filePath);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: ");
        }

        claim.setUsername(username);
        claim.setFilePath(filePath);
        claim.setClaims(insuranceClaim);
        bikeClaimsRepo.save(claim);
        return ResponseEntity.ok(user.getUsername() + " Your File uploaded and Bike claim added successfully");
    }

    @Autowired
    private CarClaimsRepo carClaimsRepo;

    @PostMapping("/user/new-claim/car-claim")
    public ResponseEntity<?> addNewCarClaim(@ModelAttribute CarClaims claim, Principal principal, @RequestParam("file") MultipartFile file) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElseThrow();
        InsuranceClaims insuranceClaim = new InsuranceClaims();
        insuranceClaim.setClaimType("Car");
        insuranceClaim.setClaimStatus("Pending");
        insuranceClaim.setUser(user);
        claimRepo.save(insuranceClaim);

        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        File destination = new File(filePath);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: ");
        }

        claim.setUsername(username);
        claim.setFilePath(filePath);
        claim.setClaims(insuranceClaim);
        carClaimsRepo.save(claim);
        return ResponseEntity.ok(user.getUsername() + " Your File uploaded and Car claim added successfully");
    }

    @Autowired
    private LifeClaimsRepo lifeClaimsRepo;

    @PostMapping("/user/new-claim/life-claim")
    public ResponseEntity<?> addNewLifeClaim(@ModelAttribute LifeClaims claim, Principal principal, @RequestParam("file") MultipartFile file) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElseThrow();
        InsuranceClaims insuranceClaim = new InsuranceClaims();
        insuranceClaim.setClaimType("Life");
        insuranceClaim.setClaimStatus("Pending");
        insuranceClaim.setUser(user);
        claimRepo.save(insuranceClaim);

        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        File destination = new File(filePath);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: ");
        }

        claim.setUsername(username);
        claim.setFilePath(filePath);
        claim.setClaims(insuranceClaim);
        lifeClaimsRepo.save(claim);
        return ResponseEntity.ok(user.getUsername() + " Your File uploaded and Life claim added successfully");
    }

    @Autowired
    private HomeClaimsRepo homeClaimsRepo;

    @PostMapping("/user/new-claim/home-claim")
    public ResponseEntity<?> addNewHomeClaim(@ModelAttribute HomeClaims claim, Principal principal, @RequestParam("file") MultipartFile file) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElseThrow();
        InsuranceClaims insuranceClaim = new InsuranceClaims();
        insuranceClaim.setClaimType("Home");
        insuranceClaim.setClaimStatus("Pending");
        insuranceClaim.setUser(user);
        claimRepo.save(insuranceClaim);

        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        File destination = new File(filePath);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: ");
        }

        claim.setUsername(username);
        claim.setFilePath(filePath);
        claim.setClaims(insuranceClaim);
        homeClaimsRepo.save(claim);
        return ResponseEntity.ok(user.getUsername() + " Your File uploaded and Home claim added successfully");
    }

    @Autowired
    private HealthClaimsRepo healthClaimsRepo;

    @PostMapping("/user/new-claim/health-claim")
    public ResponseEntity<?> addNewHealthClaim(@ModelAttribute HealthClaims claim, Principal principal, @RequestParam("file") MultipartFile file) {
        String username = principal.getName();
        Users user = usersRepo.findByUsername(username).orElseThrow();
        InsuranceClaims insuranceClaim = new InsuranceClaims();
        insuranceClaim.setClaimType("Health");
        insuranceClaim.setClaimStatus("Pending");
        insuranceClaim.setUser(user);
        claimRepo.save(insuranceClaim);

        String fileName = file.getOriginalFilename();
        String filePath = uploadDir + File.separator + fileName;
        File destination = new File(filePath);
        try {
            file.transferTo(destination);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed: ");
        }

        claim.setUsername(username);
        claim.setFilePath(filePath);
        claim.setClaims(insuranceClaim);
        healthClaimsRepo.save(claim);
        return ResponseEntity.ok(user.getUsername() + " Your File uploaded and Health claim added successfully");
    }

    @Autowired
    private ClaimsService claimsService;

    @GetMapping("/user/my-claims")
    public ResponseEntity<?> getMyClaims(Principal principal) {
        String username = principal.getName();
        List<InsuranceClaims> claims = claimsService.getClaimsByUsername(username);
        System.out.println("Claims size: " + claims.size());
        if (claims.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No Claims Found.");
        }
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/user/my-claims/{claimId}")
    public ResponseEntity<?> getClaimDetails(@PathVariable Integer claimId, @RequestParam String claimType) {
        return claimsService.getClaimById(claimId, claimType);
    }

    @GetMapping("/admin/all-claims")
    public ResponseEntity<List<InsuranceClaims>> getAllClaims() {
        List<InsuranceClaims> claims = claimsService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    @GetMapping("/admin/{claimId}")
    public ResponseEntity<?> getDetailsOfClaim(@PathVariable Integer claimId, @RequestParam String claimType) {
        return claimsService.getClaimById(claimId, claimType);
    }

    @PutMapping("/admin/claim/{claimId}/status")
    public ResponseEntity<InsuranceClaims> updateClaimStatus(
            @PathVariable Integer claimId,
            @RequestBody Map<String, String> status, Principal principal) {
        String updatedBy = principal.getName();
        String statusValue = status.get("status");
        try {
            InsuranceClaims updatedClaim = claimsService.updateClaimStatus(claimId, statusValue, updatedBy);
            return ResponseEntity.ok(updatedClaim);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/admin/claim-counts")
    public ResponseEntity<Map<String, Integer>> getClaimCounts() {
        int approvedCount = claimsService.countByStatus("Approved");
        int rejectedCount = claimsService.countByStatus("Rejected");
        int pendingCount = claimsService.countByStatus("Pending");
        int totalCount = approvedCount + rejectedCount + pendingCount;

        Map<String, Integer> claimCounts = new HashMap<>();
        claimCounts.put("approved", approvedCount);
        claimCounts.put("rejected", rejectedCount);
        claimCounts.put("pending", pendingCount);
        claimCounts.put("total", totalCount);

        return ResponseEntity.ok(claimCounts);
    }

    @GetMapping("agent/claims-by-agent")
    public ResponseEntity<Map<String, Object>> claimsByAgent(Principal principal) {
        String agentName = principal.getName();

        List<InsuranceClaims> approvedClaims = claimRepo.findAllByUpdatedByAndClaimStatus(agentName, "approved");
        List<InsuranceClaims> rejectedClaims = claimRepo.findAllByUpdatedByAndClaimStatus(agentName, "rejected");

        Map<String, Object> response = new HashMap<>();
        long approvedCount = approvedClaims.size();
        long rejectedCount = rejectedClaims.size();
        long totalCount = approvedCount + rejectedCount;

        response.put("approvedClaims", approvedCount);
        response.put("rejectedClaims", rejectedCount);
        response.put("totalClaims", totalCount);
        response.put("agentName", agentName);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/organization/getDailyClaimsCount")
    public List<Map<String, Object>> getDailyClaimsCount() {
        return claimsService.getDailyClaimsCount();
    }

    @GetMapping("/organization/getAgentClaimsCount")
    public List<Map<String, Object>> getAgentClaimsCount() {
        return claimsService.getAgentClaimsCount();
    }
}
