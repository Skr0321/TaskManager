package com.example.taskmanager.dto;

import com.example.taskmanager.Model.Priority;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskResponseDTO {

    private Long id;
    private String taskTitle;
    private String description;
    private LocalDate deadline;
    private Priority priority;
    private Long assignTo;
    private String assignToEmail;// email shown in output
    private Boolean completed;
}

