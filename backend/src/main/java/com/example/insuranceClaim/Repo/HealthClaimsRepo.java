package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.CarClaims;
import com.example.insuranceClaim.Model.HealthClaims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HealthClaimsRepo extends JpaRepository<HealthClaims,Integer> {
    Optional<HealthClaims> findByClaimsId(Integer claimId);
}
