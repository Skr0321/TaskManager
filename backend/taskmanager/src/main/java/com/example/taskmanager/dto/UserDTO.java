package com.example.taskmanager.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserDTO {

    private Long userId;
    private String email;
    private String password;
    private String accountType;
    private String organizationName;
    private LocalDate joinedDate;
    private String role;
}
