package com.example.taskmanager.service;

import com.example.taskmanager.Model.Task;
import com.example.taskmanager.Model.User;
import com.example.taskmanager.Repository.TaskRepository;
import com.example.taskmanager.Repository.UserRepository;
import com.example.taskmanager.dto.TaskDTO;
import com.example.taskmanager.dto.TaskResponseDTO;
import com.example.taskmanager.service.impl.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public TaskResponseDTO createTask(TaskDTO taskDTO, String email) {
        User adminUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"Administrator".equalsIgnoreCase(adminUser.getAccountType())) {
            throw new RuntimeException("Only administrators can create tasks.");
        }

        User assignee = userRepository.findById(taskDTO.getAssignTo())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        if (!adminUser.getOrganizationName().equalsIgnoreCase(assignee.getOrganizationName())) {
            throw new RuntimeException("Assignee must be from the same organization.");
        }

        Task task = new Task();
        task.setTaskTitle(taskDTO.getTaskTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDeadline(taskDTO.getDeadline());
        task.setPriority(taskDTO.getPriority());
        task.setAssignTo(assignee);
        task.setCompleted(false);

        Task savedTask = taskRepository.save(task);
        return mapToResponseDTO(savedTask);
    }

    @Override
    public List<TaskResponseDTO> getTasksForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Task> tasks;
        if ("Administrator".equalsIgnoreCase(user.getAccountType())) {
            tasks = taskRepository.findAllByAssignTo_OrganizationNameAndCompletedFalse(user.getOrganizationName());
        } else {
            tasks = taskRepository.findAllByAssignToAndCompletedFalse(user);
        }

        return tasks.stream().map(this::mapToResponseDTO).toList();
    }

    @Override
    public TaskResponseDTO updateTask(Long taskId, TaskDTO taskDTO, String email) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Check if the logged-in user is the assignee
        if (!task.getAssignTo().getEmail().equals(email)) {
            throw new RuntimeException("You are not allowed to update this task");
        }

        User assignee = userRepository.findById(taskDTO.getAssignTo())
                .orElseThrow(() -> new RuntimeException("Assignee not found"));

        task.setTaskTitle(taskDTO.getTaskTitle());
        task.setDescription(taskDTO.getDescription());
        task.setDeadline(taskDTO.getDeadline());
        task.setPriority(taskDTO.getPriority());
        task.setAssignTo(assignee);
        task.setCompleted(false);

        Task updatedTask = taskRepository.save(task);
        return mapToResponseDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        boolean isAssignee = task.getAssignTo().getEmail().equalsIgnoreCase(email);
        boolean isAdminFromSameOrg = "Administrator".equalsIgnoreCase(user.getAccountType())
                && user.getOrganizationName().equalsIgnoreCase(task.getAssignTo().getOrganizationName());

        if (!isAssignee && !isAdminFromSameOrg) {
            throw new RuntimeException("Not authorized to delete this task.");
        }

        taskRepository.delete(task);
    }

    @Override
    public void markTaskAsCompleted(Long taskId, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getAssignTo().getEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Only the assignee can mark the task as completed.");
        }

        task.setCompleted(true);
        taskRepository.save(task);
    }

    @Override
    public List<TaskResponseDTO> getCompletedTasks(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Task> tasks = taskRepository.findAllByCompletedTrueAndAssignTo_OrganizationName(user.getOrganizationName());
        return tasks.stream().map(this::mapToResponseDTO).toList();
    }


    @Override
    public TaskResponseDTO getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return mapToResponseDTO(task);
    }


    private TaskResponseDTO mapToResponseDTO(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTaskTitle(task.getTaskTitle());
        dto.setDescription(task.getDescription());
        dto.setDeadline(task.getDeadline());
        dto.setPriority(task.getPriority());
        dto.setAssignTo(task.getAssignTo().getUserId());
        dto.setAssignToEmail(task.getAssignTo().getEmail());
        dto.setCompleted(task.getCompleted());
        return dto;
    }
}
