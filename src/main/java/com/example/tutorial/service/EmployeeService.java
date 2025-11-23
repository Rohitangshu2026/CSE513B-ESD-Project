package com.example.tutorial.service;

import com.example.tutorial.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepo employeeRepo;

    public String login(String username, String password) {
//        Employee employee = employeeRepo.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("Student not found"));
//        return employee.getPassword().equals(password) ? "Login successful" : "Invalid password";
        return "Login successful";
    }
}
