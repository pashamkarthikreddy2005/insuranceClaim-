package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message,Long> {
}
