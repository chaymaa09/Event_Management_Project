package com.example.eventmangementproject.dao.repositories;

import com.example.eventmangementproject.dao.entities.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
