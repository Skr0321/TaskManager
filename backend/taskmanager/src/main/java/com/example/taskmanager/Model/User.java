package com.example.taskmanager.Model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "[Users]")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private Long userId;

    @Column( unique = true, nullable = false, length = 50)
    private String email;

    @Column( nullable = false, length = 200)
    private String password;

    @Column( nullable = false, length = 50)
    private String accountType;

    @Column( nullable = false, length = 50)
    private String organizationName;


    @Column( nullable = true, length = 50)
    private LocalDate joinedDate;

    @Column(nullable = true, length = 50)
    private String role;
}
