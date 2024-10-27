package com.example.insuranceClaim.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sentBy;

    private String message;

    private boolean isRead = false;

    private LocalDateTime timestamp = LocalDateTime.now();
}
