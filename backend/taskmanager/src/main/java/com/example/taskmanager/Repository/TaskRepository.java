package com.example.taskmanager.Repository;

import com.example.taskmanager.Model.Task;
import com.example.taskmanager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
   // List<Task> findAllByAssignTo(User user);
  //  List<Task> findAllByAssignTo_OrganizationName(String organizationName);
    List<Task> findAllByCompletedTrueAndAssignTo_OrganizationName(String organizationName);
    List<Task> findAllByAssignToAndCompletedFalse(User user);
    List<Task> findAllByAssignTo_OrganizationNameAndCompletedFalse(String organizationName);


}