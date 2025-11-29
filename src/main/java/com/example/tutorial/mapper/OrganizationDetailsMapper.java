package com.example.tutorial.mapper;

import com.example.tutorial.dto.OrganizationDetailsDTO;
import com.example.tutorial.entity.OrganizationDetails;

public class OrganizationDetailsMapper {
    public static OrganizationDetailsDTO toDTO(OrganizationDetails org) {
        OrganizationDetailsDTO dto = new OrganizationDetailsDTO();
        dto.setId(org.getId());
        dto.setName(org.getName());
        dto.setAddress(org.getAddress());
        return dto;
    }

    public static OrganizationDetails toEntity(OrganizationDetailsDTO dto) {
        OrganizationDetails org = new OrganizationDetails();
        org.setId(dto.getId());
        org.setName(dto.getName());
        org.setAddress(dto.getAddress());
        return org;
    }
}
