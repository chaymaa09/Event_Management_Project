package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
