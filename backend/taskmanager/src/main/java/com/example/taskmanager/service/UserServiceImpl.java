package com.example.taskmanager.service;

import com.example.taskmanager.Model.User;
import com.example.taskmanager.Repository.UserRepository;
import com.example.taskmanager.dto.UserDTO;
import com.example.taskmanager.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String registerUser(UserDTO userDTO) {
        // Check if admin already exists for the organization
        if ("administrator".equalsIgnoreCase(userDTO.getAccountType())) {
            boolean adminExists = userRepository.existsByAccountTypeAndOrganizationNameIgnoreCase("administrator", userDTO.getOrganizationName());
            if (adminExists) {
                return "An admin already exists for this organization.";
            }
        }

        // Create and save the user
        User user = new User();
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // In production, hash this
        user.setAccountType(userDTO.getAccountType());
        user.setOrganizationName(userDTO.getOrganizationName());
        user.setJoinedDate(LocalDate.now());
        // Automatically assign role
        if ("administrator".equalsIgnoreCase(userDTO.getAccountType())) {
            user.setRole("admin");
        } else {
            user.setRole("member");
        }


        userRepository.save(user);

        return "User registered successfully.";
    }

    @Override
    public UserDTO getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserDTO dto = new UserDTO();
        dto.setEmail(user.getEmail());
        dto.setAccountType(user.getAccountType());
        dto.setOrganizationName(user.getOrganizationName());
        dto.setJoinedDate(user.getJoinedDate());
        return dto;
    }

    @Override
    public List<UserDTO> getUsersByOrganization(String email) {
        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

       // if (!"administrator".equalsIgnoreCase(adminUser.getAccountType())) {
         //   throw new RuntimeException("Access denied: Only admins can view organization users.");
        // }

        List<User> users = userRepository.findAllByOrganizationNameIgnoreCase(adminUser.getOrganizationName());

        return users.stream().map(user -> {
            UserDTO dto = new UserDTO();
            dto.setUserId(user.getUserId());
            dto.setEmail(user.getEmail());
            dto.setAccountType(user.getAccountType());
            dto.setOrganizationName(user.getOrganizationName());
            dto.setJoinedDate(user.getJoinedDate());
            dto.setRole(user.getRole());
            return dto;
        }).toList();
    }

}
