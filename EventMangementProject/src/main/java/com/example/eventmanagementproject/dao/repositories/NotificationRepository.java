package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Notification;
import com.example.eventmangementproject.dao.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUser(User user);
    List<Notification> findByUserAndIsReadFalse(User user);
}
