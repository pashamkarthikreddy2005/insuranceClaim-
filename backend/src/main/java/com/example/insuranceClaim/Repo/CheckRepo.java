package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.HasPolicy;
import com.example.insuranceClaim.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckRepo extends JpaRepository<HasPolicy,Integer> {

    HasPolicy findByUser(Users user);
}
