package com.example.tutorial.mapper;

import com.example.tutorial.dto.EmployeesDTO;
import com.example.tutorial.entity.Employees;

public class EmployeesMapper {
    public class EmployeeMapper {
        public static EmployeesDTO toDTO(Employees emp) {
            EmployeesDTO dto = new EmployeesDTO();
            dto.setId(emp.getId());
            dto.setFirstName(emp.getFirstName());
            dto.setLastName(emp.getLastName());
            dto.setEmail(emp.getEmail());
            dto.setTitle(emp.getTitle());
            dto.setPhotographPath(emp.getPhotographPath());
            dto.setDepartmentId(emp.getDepartmentId());
            dto.setUsername(emp.getUsername());
            dto.setPassword(emp.getPassword());
            return dto;
        }

        public static Employees toEntity(EmployeesDTO dto) {
            Employees emp = new Employees();
            emp.setId(dto.getId());
            emp.setFirstName(dto.getFirstName());
            emp.setLastName(dto.getLastName());
            emp.setEmail(dto.getEmail());
            emp.setTitle(dto.getTitle());
            emp.setPhotographPath(dto.getPhotographPath());
            emp.setDepartmentId(dto.getDepartmentId());
            emp.setUsername(dto.getUsername());
            emp.setPassword(dto.getPassword());
            return emp;
        }
    }

}
