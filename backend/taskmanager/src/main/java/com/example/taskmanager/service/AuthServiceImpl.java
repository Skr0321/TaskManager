package com.example.taskmanager.service;


import com.example.taskmanager.Model.User;
import com.example.taskmanager.Repository.UserRepository;
import com.example.taskmanager.config.JwtService;
import com.example.taskmanager.dto.AuthDTO;
import com.example.taskmanager.dto.JwtToken;
import com.example.taskmanager.service.impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public JwtToken login(AuthDTO request) {
        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid email or password");
        }

        var userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String jwt = jwtService.generateToken(userDetails);

        // Fetch user to get accountType
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));


        return new JwtToken(jwt, user.getAccountType());
    }
}