package com.example.taskmanager.controllers;


import com.example.taskmanager.dto.UserDTO;
import com.example.taskmanager.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/auth/users")
@CrossOrigin(origins =  {"http://localhost:3000", "https://task-manager-fullstack-phi.vercel.app", "https://task-manager-9f1j.vercel.app"})
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        String message = userService.registerUser(userDTO);
        if (message.contains("already exists")) {
            return ResponseEntity.badRequest().body(message);
        }
        return ResponseEntity.ok(message);
    }


    @GetMapping("/profile")
    public ResponseEntity<UserDTO> getProfile(@RequestParam String email) {
        UserDTO profile = userService.getUserProfile(email);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/organization")
    public ResponseEntity<List<UserDTO>> getUsersInOrganization(@RequestParam String email) {
        List<UserDTO> users = userService.getUsersByOrganization(email);
        return ResponseEntity.ok(users);
    }
}



