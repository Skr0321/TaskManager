package com.example.taskmanager.service.impl;

import com.example.taskmanager.dto.AuthDTO;
import com.example.taskmanager.dto.JwtToken;

public interface AuthService {
    JwtToken login(AuthDTO request);
}
