package com.example.tutorial.dto;

import lombok.Data;

@Data
public class EmployeesDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private String photographPath;
    private int departmentId;
    private String username;
    private String password;
}
