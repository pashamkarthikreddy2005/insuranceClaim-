package com.example.insuranceClaim.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String agentName;

    private String message;

    private boolean isRead = false;

    private LocalDateTime timestamp = LocalDateTime.now();
}
