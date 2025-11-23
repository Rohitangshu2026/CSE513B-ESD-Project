package com.example.tutorial.repository;

import com.example.tutorial.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeeRepo extends JpaRepository<Employees, Integer>{
    Optional<Employees> findByUsername(String username);
}
