package com.example.insuranceClaim.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "claims")
public class InsuranceClaims {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String claimType;
    private String claimStatus;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @Column(name = "submission_date", nullable = false, updatable = false)
    private LocalDateTime submissionDate;

    private String updatedBy;
    @PrePersist
    protected void onCreate() {
        this.submissionDate = LocalDateTime.now();
        this.updatedBy=null;
    }

}
