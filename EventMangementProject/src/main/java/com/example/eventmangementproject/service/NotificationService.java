package com.example.eventmangementproject.service;
import com.example.eventmangementproject.dao.entities.Notification;
import com.example.eventmangementproject.dao.entities.User;

import java.util.List;

public interface NotificationService {
    List<Notification> getUserNotifications(User user);
    List<Notification> getUnreadNotifications(User user);
    Notification createNotification(Notification notification);
    Notification markAsRead(Long notificationId);
    void markAllAsRead(User user);
    boolean deleteNotification(Long notificationId);
    int getUnreadCount(User user);
}
