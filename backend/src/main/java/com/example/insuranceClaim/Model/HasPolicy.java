package com.example.insuranceClaim.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "hasPolicy")
public class HasPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private Users user;

    @Column(name = "has_bike", nullable = false)
    private boolean hasBike = false;

    @Column(name = "has_life", nullable = false)
    private boolean hasLife = false;

    @Column(name = "has_car", nullable = false)
    private boolean hasCar = false;

    @Column(name = "has_health", nullable = false)
    private boolean hasHealth = false;

    @Column(name = "has_home", nullable = false)
    private boolean hasHome = false;

}
