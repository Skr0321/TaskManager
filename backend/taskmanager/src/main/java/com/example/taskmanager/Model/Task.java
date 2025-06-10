package com.example.taskmanager.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "Task")
public class Task {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskTitle;

    private String description;

    private LocalDate deadline;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User assignTo;

    @Column(nullable = true)
    private Boolean completed;


}
