package com.example.tutorial.service;

import com.example.tutorial.entity.OrganizationDetails;
import com.example.tutorial.repository.OrganizationDetailsRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.tutorial.repository.OrganizationHrRepo;
import com.example.tutorial.entity.Organization_HR;

import java.util.List;
import java.util.stream.Stream;

import java.util.Arrays;
import java.util.Optional;

@Service
public class OrganizationDetailsService {
    @Autowired
    private OrganizationDetailsRepo organizationDetailsRepo;
    @Autowired
    private OrganizationHrRepo  organizationHrRepo;

    public OrganizationDetails findByName(String orgName) {
        return organizationDetailsRepo.findByName(orgName).orElse(null);
    }
    public Iterable<OrganizationDetails> listAllOrganizationDetails() {
        return organizationDetailsRepo.findAll();
    }

    public Optional<Iterable<Organization_HR>> listAllHrDetails(String organizationName) {
        OrganizationDetails existingOrgDetails  = organizationDetailsRepo.findByName(organizationName).orElse(null);
        if(existingOrgDetails != null) {
            int orgId = existingOrgDetails.getId();
            return Optional.of(organizationHrRepo.findByOrganizationId(orgId));
        }
        return Optional.empty();
    }

    public String updateOrganizationDetailsByName(String orgName, OrganizationDetails newOrganizationDetails) {
        OrganizationDetails existingOrgDetails = organizationDetailsRepo.findByName(orgName)
                .orElseThrow(() -> new RuntimeException("The Employee id doesn't exist"));
        System.out.println("Got existing details");
        String[] ignoreProps = NullFieldFilter.getNullPropertyNames(newOrganizationDetails);
        String[] finalIgnore = Arrays.copyOf(ignoreProps, ignoreProps.length + 1);
        finalIgnore[ignoreProps.length] = "id";
        BeanUtils.copyProperties(/*source*/ newOrganizationDetails, /*target*/ existingOrgDetails, /*ignore properties*/ finalIgnore);
        organizationDetailsRepo.save(existingOrgDetails);
        return "Organization details updated successfully";
    }

    public String deleteOrganizationDetailsByName(String orgName) {
        OrganizationDetails orgDetails = organizationDetailsRepo.findByName(orgName)
                .orElseThrow(() -> new RuntimeException("The Organization doesn't exist"));
        Iterable<Organization_HR> orgHrList = organizationHrRepo.findByOrganizationId(orgDetails.getId());
        organizationDetailsRepo.delete(orgDetails);
        orgHrList.forEach(orgHr -> organizationHrRepo.delete(orgHr));
        return "Deleted Successfully";
    }

    public String createOrganizationDetails(OrganizationDetails organizationDetails) {
        organizationDetailsRepo.save(organizationDetails);
        return "Organization details created successfully";
    }

    public String createOrganizationHr(int organizationId, Organization_HR organizationHr) {
        organizationHr.setOrganizationId(organizationId);
        organizationHrRepo.save(organizationHr);
        return "Organization HR created successfully";
    }

    public String updateOrganizationHr(int hrId, Organization_HR organizationHr) {
        Organization_HR existingOrgHr = organizationHrRepo.findById(hrId)
                .orElseThrow(() -> new RuntimeException("The Employee id doesn't exist"));
        String[] ignoreProps = NullFieldFilter.getNullPropertyNames(organizationHr);
        String[] finalIgnore = Arrays.copyOf(ignoreProps, ignoreProps.length + 2);
        finalIgnore[ignoreProps.length] = "id";
        finalIgnore[ignoreProps.length + 1] = "organizationId";

        BeanUtils.copyProperties(/*source*/ organizationHr, /*target*/ existingOrgHr, /*ignore properties*/finalIgnore);
        organizationHrRepo.save(existingOrgHr);
        return "Organization HR updated successfully";
    }

    public String deleteOrganizationHr(int hrId) {
        Organization_HR orgHr = organizationHrRepo.findById(hrId)
                .orElseThrow(() -> new RuntimeException("The Employee id doesn't exist"));
        organizationHrRepo.delete(orgHr);
        return "Deleted Successfully";
    }

    public List<OrganizationDetails> searchOrganizationDetails(String searchText) {
        return organizationDetailsRepo.findByNameContainingIgnoreCase(searchText);
    }

    public List<Organization_HR> searchOrganizationHrDetails(String searchText, int orgId) {
        List<Organization_HR> fullNameSearch = organizationHrRepo.searchByFullName(searchText)
                .stream()
                .filter(hr -> hr.getOrganizationId() == orgId)
                .toList();
        return fullNameSearch;
    }

    public Organization_HR getOrgHrByHrId(int hrId) {
        Organization_HR hrDetails = organizationHrRepo.findById(hrId)
                .orElseThrow(() -> new RuntimeException("The Employee id doesn't exist"));
        return hrDetails;
    }
}
