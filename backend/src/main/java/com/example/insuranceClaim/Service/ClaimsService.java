package com.example.insuranceClaim.Service;

import com.example.insuranceClaim.Model.*;
import com.example.insuranceClaim.Repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClaimsService {

    @Autowired
    private BikeClaimsRepo bikeClaimRepository;

    @Autowired
    private CarClaimsRepo carClaimRepository;

    @Autowired
    private LifeClaimsRepo lifeClaimsRepo;

    @Autowired
    private HealthClaimsRepo healthClaimsRepo;

    @Autowired
    private ClaimRepo claimRepo;

    @Autowired
    private HomeClaimsRepo homeClaimsRepo;

    public List<InsuranceClaims> getClaimsByUsername(String username) {
        return claimRepo.findByUserUsername(username);
    }

    public ResponseEntity<?> getClaimById(Integer claimId, String claimType) {
        switch (claimType) {
            case "Bike":
                Optional<BikeClaims> bikeClaim = bikeClaimRepository.findByClaimsId(claimId);
                return bikeClaim.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            case "Car":
                Optional<CarClaims> carClaim = carClaimRepository.findByClaimsId(claimId);
                return carClaim.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            case "Life":
                Optional<LifeClaims> lifeClaim = lifeClaimsRepo.findByClaimsId(claimId);
                return lifeClaim.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            case "Health":
                Optional<HealthClaims> healthClaim = healthClaimsRepo.findByClaimsId(claimId);
                return healthClaim.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            case "Home":
                Optional<HomeClaims> homeClaim = homeClaimsRepo.findByClaimsId(claimId);
                return homeClaim.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
            default:
                return ResponseEntity.badRequest().body("Invalid claim type.");
        }
    }

    public List<InsuranceClaims> getAllClaims() {
        return claimRepo.findAll();
    }

    public InsuranceClaims updateClaimStatus(Integer claimId, String status,String updatedBy) {
        InsuranceClaims claim = claimRepo.findById(claimId)
                .orElseThrow(() -> new NoSuchElementException("Claim not found with id: " + claimId));

        claim.setClaimStatus(status);
        claim.setUpdatedBy(updatedBy);
        return claimRepo.save(claim);
    }

    public int countByStatus(String status) {
        return claimRepo.countByClaimStatus(status);
    }

    public List<Map<String, Object>> getDailyClaimsCount() {
        return claimRepo.getDailyClaimsCount().stream()
                .map(record -> Map.of("date", record[0], "count", record[1]))
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAgentClaimsCount() {
        return claimRepo.getAgentClaimsCount().stream()
                .map(record -> Map.of("agentName", record[0], "claimsCount", record[1]))
                .collect(Collectors.toList());
    }
}
