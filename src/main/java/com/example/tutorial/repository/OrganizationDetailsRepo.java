package com.example.tutorial.repository;

import com.example.tutorial.entity.OrganizationDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import java.util.List;

@Repository
public interface OrganizationDetailsRepo extends JpaRepository<OrganizationDetails, Integer>{
    Optional<OrganizationDetails> findByName(String orgName);
    List<OrganizationDetails> findByNameContainingIgnoreCase(String name);
}
