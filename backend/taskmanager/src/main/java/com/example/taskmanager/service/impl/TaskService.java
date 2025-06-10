package com.example.taskmanager.service.impl;

import com.example.taskmanager.dto.TaskDTO;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.dto.UserDTO;

import java.util.List;

public interface TaskService {
    TaskResponseDTO createTask(TaskDTO taskDTO, String email);
    List<TaskResponseDTO> getTasksForUser(String email);
    void deleteTask(Long taskId, String email);
    TaskResponseDTO updateTask(Long taskId, TaskDTO taskDTO, String email);
    void markTaskAsCompleted(Long taskId, String email);
    List<TaskResponseDTO> getCompletedTasks(String email);
    TaskResponseDTO getTaskById(Long id);



}


