package com.example.eventmanagementproject.dao.repositories;

import com.example.eventmanagementproject.dao.entities.Notification;
import com.example.eventmanagementproject.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
    List<Notification> findByUserAndIsReadFalse(User user);
}
