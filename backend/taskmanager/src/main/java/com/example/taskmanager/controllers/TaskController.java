package com.example.taskmanager.controllers;



import com.example.taskmanager.dto.TaskDTO;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.service.impl.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("/auth/task")
@CrossOrigin(origins =  {"http://localhost:3000", "https://task-manager-fullstack-phi.vercel.app"})
public class TaskController {

    @Autowired
    private TaskService taskService;


    @PostMapping("/create")
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskDTO taskDTO, HttpServletRequest request) {
        String email = (String) request.getAttribute("email"); // Extracted from token in filter
        TaskResponseDTO createdTask = taskService.createTask(taskDTO, email);
        return ResponseEntity.ok(createdTask);
    }


    @GetMapping("/tasks/all")
    public ResponseEntity<List<TaskResponseDTO>> getMyTasks(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        List<TaskResponseDTO> tasks = taskService.getTasksForUser(email);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id, @RequestBody TaskDTO taskDTO, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        TaskResponseDTO updated = taskService.updateTask(id, taskDTO, email);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        taskService.deleteTask(id, email);
        return ResponseEntity.ok("Task deleted successfully.");
    }
    
    @PutMapping("/{id}/complete")
    public ResponseEntity<String> markTaskCompleted(@PathVariable Long id, HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        taskService.markTaskAsCompleted(id, email);
        return ResponseEntity.ok("Task marked as completed.");
    }

    @GetMapping("/completed")
    public ResponseEntity<List<TaskResponseDTO>> getCompletedTasks(HttpServletRequest request) {
        String email = (String) request.getAttribute("email");
        List<TaskResponseDTO> completedTasks = taskService.getCompletedTasks(email);
        return ResponseEntity.ok(completedTasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
        TaskResponseDTO taskResponse = taskService.getTaskById(id);
        return ResponseEntity.ok(taskResponse);
    }
}