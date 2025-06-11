package com.example.taskmanager.service.impl;


import com.example.taskmanager.dto.UserDTO;

import java.util.List;

public interface UserService {

    String registerUser(UserDTO userDTO);

    UserDTO getUserProfile(String email);
    List<UserDTO> getUsersByOrganization(String email);


}
