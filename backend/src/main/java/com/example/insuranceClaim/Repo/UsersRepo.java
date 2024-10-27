package com.example.insuranceClaim.Repo;

import com.example.insuranceClaim.Model.Users;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsersRepo extends JpaRepository<Users,Integer> {

    Optional<Users> findByUsername(String username);

    Optional<Object> findByEmail(String email);

    long countByRole(String agent);

    List<Users> findAllByRole(String user);

    @Modifying
    @Transactional
    @Query("DELETE FROM Users u WHERE u.username = ?1")
    void deleteByUsername(String username);
}
