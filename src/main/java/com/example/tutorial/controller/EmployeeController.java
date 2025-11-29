package com.example.tutorial.controller;
import io.swagger.v3.oas.annotations.Hidden;
import com.example.tutorial.dto.OrganizationDetailsDTO;
import com.example.tutorial.dto.OrganizationHRDetailsDTO;
import com.example.tutorial.entity.OrganizationDetails;
import com.example.tutorial.entity.Organization_HR;
import com.example.tutorial.mapper.OrganizationDetailsMapper;
import com.example.tutorial.mapper.OrganizationHRDetailsMapper;
import com.example.tutorial.service.OrganizationDetailsService;
import com.example.tutorial.service.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final OrganizationDetailsService organizationDetailsService;

    @Autowired
    private TokenService tokenService;

    @Value("${google.client_id}")
    private String clientId;

    @Value("${google.redirect_uri}")
    private String redirectUri;

    @Autowired
    public EmployeeController(OrganizationDetailsService organizationDetailsService) {
        this.organizationDetailsService = organizationDetailsService;
    }

    // ====================== LOGIN ======================


    @Hidden
    @GetMapping("/login")
    public void googleLogin(HttpServletResponse response) throws IOException {
        String googleUrl =
                "https://accounts.google.com/o/oauth2/v2/auth?"
                        + "scope=openid%20email%20profile&"
                        + "response_type=code&"
                        + "redirect_uri=http://localhost:8080/api/employee/oauth2/callback&"
                        + "client_id=186079157780-t8iv6s2t0faf06ge4onuqln30dujjg09.apps.googleusercontent.com";

        response.sendRedirect(googleUrl);
    }
    @GetMapping("/login/swagger")
    public String loginDocs() {
        return "This endpoint logs you in using Google OAuth. Please open /api/employee/login in your browser.";
    }

    // ====================== CALLBACK ======================
    @GetMapping("/oauth2/callback")
    public void callback(@RequestParam String code, HttpServletResponse response) throws Exception {

        String idToken = tokenService.exchangeCode(code);

        Cookie cookie = new Cookie("ID_TOKEN", idToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        response.addCookie(cookie);

        response.sendRedirect("http://localhost:5173/org/list");
    }

    // ======================Logout==============================

    @GetMapping("/logout")
    public String logout (HttpServletResponse response) throws IOException{

        Cookie cookie = new Cookie("ID_TOKEN", null);

        // 2. Set attributes to match the original cookie
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        // 3. Set MaxAge to 0 to trigger deletion
        cookie.setMaxAge(0);

        // 💡 Keep the domain setting only if the original cookie had it.
        // For 'localhost', it's often better to omit it or handle it dynamically.
        // For the sake of matching your original code, we'll keep it:
        cookie.setDomain("localhost");

        // 4. Send the cookie to the browser
        response.addCookie(cookie);

        // 5. Redirect the user to a logical endpoint (e.g., login or home page)
        response.sendRedirect("http://localhost:5173/");
        return "Logout Successful";
    }

    // ====================== API ENDPOINTS ======================

    @GetMapping("/get")
    public Iterable<OrganizationDetailsDTO> getOrganizationDetails() {
        List<OrganizationDetailsDTO> orgHRDTO = new ArrayList<>();
        organizationDetailsService.listAllOrganizationDetails()
                .forEach(org -> orgHRDTO.add(OrganizationDetailsMapper.toDTO(org)));
        return orgHRDTO;
    }

    @GetMapping("/get/hr/{organization_name}")
    public Iterable<OrganizationHRDetailsDTO> getOrganizationHrDetails(@PathVariable("organization_name") String organization_name) {
        try {
            Optional<Iterable<Organization_HR>> organizationHR = organizationDetailsService.listAllHrDetails(organization_name);
            if (organizationHR.isPresent()) {
                List<OrganizationHRDetailsDTO> orgHrDTO = new ArrayList<>();
                organizationHR.get()
                        .forEach(org -> orgHrDTO.add(OrganizationHRDetailsMapper.toDTO(org)));
                return orgHrDTO;
            }
            else {
                return new ArrayList<>();
            }
        }
        catch(RuntimeException e){
            System.out.println("No HR details found for organization: " + organization_name);
            throw e;
            }
    }

    @GetMapping("/get/hrId/{hr_id}/{org_name}")
    public OrganizationHRDetailsDTO getOrganizationHrDetailsByHrId(
            @PathVariable("hr_id") int hr_id,
            @PathVariable("org_name") String org_name) {
        try{
            Organization_HR hr = organizationDetailsService.getOrgHrByHrId(hr_id, org_name);
            return OrganizationHRDetailsMapper.toDTO(hr);
        }
        catch(Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "HR Not Found");

        }
    }

    @GetMapping("/get/{organization_name}")
    public OrganizationDetailsDTO getOrganizationDetailsByName(
            @PathVariable("organization_name") String organization_name) {

        OrganizationDetails org = organizationDetailsService.findByName(organization_name);

        if (org == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Organization Not Found");
        }

        return OrganizationDetailsMapper.toDTO(org);
    }


    @PatchMapping("/update/{organization_name}")
    public String updateOrganizationDetailsByName(@PathVariable("organization_name") String organization_name, @RequestBody OrganizationDetailsDTO organizationDetails) {
        OrganizationDetails organizationDetailsEntity = OrganizationDetailsMapper.toEntity(organizationDetails);
        return organizationDetailsService.updateOrganizationDetailsByName(organization_name, organizationDetailsEntity);
    }

    @DeleteMapping("/delete/{organization_name}")
    public String deleteOrganizationDetailsByName(@PathVariable("organization_name") String organization_name) {
        return organizationDetailsService.deleteOrganizationDetailsByName(organization_name);
    }

    @PostMapping("/create")
    public String createOrganizationDetails(@RequestBody OrganizationDetailsDTO organizationDetailsDTO) {
        OrganizationDetails organizationDetailsEntity = OrganizationDetailsMapper.toEntity(organizationDetailsDTO);
        return organizationDetailsService.createOrganizationDetails(organizationDetailsEntity);
    }

    @PostMapping("/create/hr/{org_name}")
    public String createOrganizationHr(@PathVariable("org_name") String org_name, @RequestBody OrganizationHRDetailsDTO organizationHrDTO) {
        int org_id = organizationDetailsService.findByName(org_name).getId();
        Organization_HR organizationHr = OrganizationHRDetailsMapper.toEntity(organizationHrDTO);
        return organizationDetailsService.createOrganizationHr(org_id, organizationHr);
    }

    @PatchMapping("/update/hr/{hr_id}")
    public String updateOrganizationHr(@PathVariable("hr_id") int hr_id, @RequestBody OrganizationHRDetailsDTO organizationHrDTO) {
        Organization_HR organizationHr = OrganizationHRDetailsMapper.toEntity(organizationHrDTO);
        return organizationDetailsService.updateOrganizationHr(hr_id, organizationHr);
    }

    @DeleteMapping("/delete/hr/{hr_id}")
    public String deleteOrganizationHr(@PathVariable("hr_id") int hr_id) {
        return organizationDetailsService.deleteOrganizationHr(hr_id);
    }

    @GetMapping("/search/{search_text}")
    public List<OrganizationDetailsDTO> searchOrganizationDetails(@PathVariable("search_text") String search_text) {
        List<OrganizationDetailsDTO> organizationDetailsDTO = new ArrayList<>();
        organizationDetailsService.searchOrganizationDetails(search_text).forEach(org -> organizationDetailsDTO.add(OrganizationDetailsMapper.toDTO(org)));
        return organizationDetailsDTO;
    }

    @GetMapping("/search/hr/{search_text}/{org_name}")
    public List<OrganizationHRDetailsDTO> searchOrganizationHrDetails(@PathVariable("search_text") String search_text, @PathVariable("org_name") String org_name) {
        int org_id = organizationDetailsService.findByName(org_name).getId();
        List<OrganizationHRDetailsDTO> organizationHRDetailsDTOS = new ArrayList<>();
        organizationDetailsService.searchOrganizationHrDetails(search_text, org_id).forEach(orgHr -> organizationHRDetailsDTOS.add(OrganizationHRDetailsMapper.toDTO(orgHr)));
        return organizationHRDetailsDTOS;
    }
}