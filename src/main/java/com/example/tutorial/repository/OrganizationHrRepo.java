package com.example.tutorial.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.tutorial.entity.Organization_HR;

import java.util.List;

@Repository
public interface OrganizationHrRepo extends JpaRepository<Organization_HR, Integer>{
    Iterable<Organization_HR> findByOrganizationId(int organizationId);
    @Query("SELECT h FROM Organization_HR h WHERE " +
            "LOWER(CONCAT(h.firstName, ' ', h.lastName)) LIKE LOWER(CONCAT('%', :text, '%'))")
    List<Organization_HR> searchByFullName(@Param("text") String text);
}
