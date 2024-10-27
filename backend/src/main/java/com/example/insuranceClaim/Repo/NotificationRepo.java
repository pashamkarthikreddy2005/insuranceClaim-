package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByUsername(String username);
}
