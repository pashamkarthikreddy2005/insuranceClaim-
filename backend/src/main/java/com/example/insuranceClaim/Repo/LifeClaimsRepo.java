package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.CarClaims;
import com.example.insuranceClaim.Model.LifeClaims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LifeClaimsRepo extends JpaRepository<LifeClaims,Integer> {
    Optional<LifeClaims> findByClaimsId(Integer claimId);
}
