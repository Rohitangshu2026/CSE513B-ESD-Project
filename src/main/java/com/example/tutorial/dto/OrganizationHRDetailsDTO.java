package com.example.tutorial.dto;

import lombok.Data;

@Data
public class OrganizationHRDetailsDTO {
    private int id;
    private String firstName;
    private String lastName;
    private String email;
    private String contactNumber;
    private int organizationId;
}
