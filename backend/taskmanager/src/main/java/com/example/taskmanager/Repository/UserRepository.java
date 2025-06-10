package com.example.taskmanager.Repository;

import com.example.taskmanager.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    boolean existsByAccountTypeAndOrganizationNameIgnoreCase(String accountType, String organizationName);
    List<User> findAllByOrganizationNameIgnoreCase(String organizationName);
    List<User> findByOrganizationName(String organizationName);



}
