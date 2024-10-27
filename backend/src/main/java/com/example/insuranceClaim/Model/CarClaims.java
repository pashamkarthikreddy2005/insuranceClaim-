package com.example.insuranceClaim.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class CarClaims {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private LocalDate dateOfBirth;
    private String policyNumber;
    private String vehicleModel;
    private String claimReason;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "claim_amount", nullable = false)
    private Double claimAmount;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "claim_id")
    private InsuranceClaims claims;
}
