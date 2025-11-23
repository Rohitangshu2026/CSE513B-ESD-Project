package com.example.tutorial.controller;

import com.example.tutorial.entity.OrganizationDetails;
import com.example.tutorial.service.EmployeeService;
import com.example.tutorial.service.OrganizationDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.tutorial.entity.Organization_HR;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final OrganizationDetailsService organizationDetailsService;
    @Autowired
    public EmployeeController(EmployeeService employeeService, OrganizationDetailsService organizationDetailsService) {
        this.employeeService = employeeService;
        this.organizationDetailsService = organizationDetailsService;
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        return employeeService.login(username, password);
    }

    @GetMapping("/get")
    public Iterable<OrganizationDetails> getOrganizationDetails() {
        return organizationDetailsService.listAllOrganizationDetails();
    }

    @GetMapping("/get/hr/{organization_name}")
    public Iterable<Organization_HR> getOrganizationHrDetails(@PathVariable("organization_name") String organization_name) {
        Optional<Iterable<Organization_HR>> organizationHR = organizationDetailsService.listAllHrDetails(organization_name);
        if (organizationHR.isPresent()) {
            return organizationHR.get();
        }
        return new ArrayList<>();
    }

    @GetMapping("/get/hrId/{hr_id}")
    public Organization_HR getOrganizationHrDetailsByHrId(@PathVariable("hr_id") int hr_id) {
        return organizationDetailsService.getOrgHrByHrId(hr_id);
    }

    @GetMapping("/get/{organization_name}")
    public OrganizationDetails getOrganizationDetailsByName(@PathVariable("organization_name") String organization_name) {
        return organizationDetailsService.findByName(organization_name);
    }

    @PatchMapping("/update/{organization_name}")
    public String updateOrganizationDetailsByName(@PathVariable("organization_name") String organization_name, @RequestBody OrganizationDetails organizationDetails) {
        return organizationDetailsService.updateOrganizationDetailsByName(organization_name, organizationDetails);
    }

    @DeleteMapping("/delete/{organization_name}")
    public String deleteOrganizationDetailsByName(@PathVariable("organization_name") String organization_name) {
        return organizationDetailsService.deleteOrganizationDetailsByName(organization_name);
    }

    @PostMapping("/create")
    public String createOrganizationDetails(@RequestBody OrganizationDetails organizationDetails) {
        return organizationDetailsService.createOrganizationDetails(organizationDetails);
    }

    @PostMapping("/create/hr/{org_name}")
    public String createOrganizationHr(@PathVariable("org_name") String org_name, @RequestBody Organization_HR organizationHr) {
        int org_id = organizationDetailsService.findByName(org_name).getId();
        return organizationDetailsService.createOrganizationHr(org_id, organizationHr);
    }

    @PatchMapping("/update/hr/{hr_id}")
    public String updateOrganizationHr(@PathVariable("hr_id") int hr_id, @RequestBody Organization_HR organizationHr) {
        return organizationDetailsService.updateOrganizationHr(hr_id, organizationHr);
    }

    @DeleteMapping("/delete/hr/{hr_id}")
    public String deleteOrganizationHr(@PathVariable("hr_id") int hr_id) {
        return organizationDetailsService.deleteOrganizationHr(hr_id);
    }

    @GetMapping("/search/{search_text}")
    public List<OrganizationDetails> searchOrganizationDetails(@PathVariable("search_text") String search_text) {
        return organizationDetailsService.searchOrganizationDetails(search_text);
    }

    @GetMapping("/search/hr/{search_text}/{org_name}")
    public List<Organization_HR> searchOrganizationHrDetails(@PathVariable("search_text") String search_text, @PathVariable("org_name") String org_name) {
        int org_id = organizationDetailsService.findByName(org_name).getId();
        return organizationDetailsService.searchOrganizationHrDetails(search_text, org_id);
    }
}
