package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.BikeClaims;
import com.example.insuranceClaim.Model.InsuranceClaims;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BikeClaimsRepo extends JpaRepository<BikeClaims,Integer> {
    Optional<BikeClaims> findByClaimsId(Integer claimId);

    Object findByClaims(InsuranceClaims claim);
}
