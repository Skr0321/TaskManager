package com.example.taskmanager.Model;


import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "[Users]")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column( unique = true, nullable = false, length = 50)
    private String email;

    @Column( nullable = false, length = 50)
    private String password;

    @Column( nullable = false, length = 50)
    private String accountType;

    @Column( nullable = false, length = 50)
    private String organizationName;

}
