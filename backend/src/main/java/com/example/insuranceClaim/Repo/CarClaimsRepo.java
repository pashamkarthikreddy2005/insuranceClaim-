package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.BikeClaims;
import com.example.insuranceClaim.Model.CarClaims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarClaimsRepo extends JpaRepository<CarClaims,Integer> {
    Optional<CarClaims> findByClaimsId(Integer claimId);
}
