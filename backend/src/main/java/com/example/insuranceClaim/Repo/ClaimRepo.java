package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.InsuranceClaims;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClaimRepo extends JpaRepository<InsuranceClaims,Integer> {

    List<InsuranceClaims> findByUserUsername(String username);

    int countByClaimStatus(String status);

    List<InsuranceClaims> findAllByUpdatedByAndClaimStatus(String agentName, String approved);
    @Query("SELECT DATE(c.submissionDate) AS date, COUNT(c) AS count FROM InsuranceClaims c GROUP BY DATE(c.submissionDate)")
    List<Object[]> getDailyClaimsCount();

    @Query("SELECT c.updatedBy AS agentName, COUNT(c) AS count FROM InsuranceClaims c WHERE c.updatedBy IS NOT NULL GROUP BY c.updatedBy")
    List<Object[]> getAgentClaimsCount();
}
