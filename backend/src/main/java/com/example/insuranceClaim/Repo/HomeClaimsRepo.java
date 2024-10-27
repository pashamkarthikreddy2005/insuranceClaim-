package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.HealthClaims;
import com.example.insuranceClaim.Model.HomeClaims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HomeClaimsRepo extends JpaRepository<HomeClaims,Integer> {
    Optional<HomeClaims> findByClaimsId(Integer claimId);
}
