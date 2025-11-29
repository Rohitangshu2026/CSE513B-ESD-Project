package com.example.tutorial.mapper;

import com.example.tutorial.dto.OrganizationHRDetailsDTO;
import com.example.tutorial.entity.Organization_HR;

public class OrganizationHRDetailsMapper {
    public static OrganizationHRDetailsDTO toDTO(Organization_HR org) {
        OrganizationHRDetailsDTO dto = new OrganizationHRDetailsDTO();
        dto.setId(org.getId());
        dto.setFirstName(org.getFirstName());
        dto.setLastName(org.getLastName());
        dto.setEmail(org.getEmail());
        dto.setContactNumber(org.getContactNumber());
        dto.setOrganizationId(org.getOrganizationId());
        return dto;
    }
    public static Organization_HR toEntity(OrganizationHRDetailsDTO dto) {
        Organization_HR org = new Organization_HR();
        org.setId(dto.getId());
        org.setFirstName(dto.getFirstName());
        org.setLastName(dto.getLastName());
        org.setEmail(dto.getEmail());
        org.setContactNumber(dto.getContactNumber());
        org.setOrganizationId(dto.getOrganizationId());
        return org;
    }
}
