package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
