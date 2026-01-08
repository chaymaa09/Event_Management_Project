package com.example.eventmanagementproject.dao.entities;

public enum ParticipationStatus {
    CONFIRMED,      // Registration confirmed
    WAITING,        // dans la liste d'attente
    CANCELLED,      // User cancelled
    PENDING,        // Il attent la confirmation de créateur
    BLOCKED,        // Organizer rejected or blocked
    JOINED// User attended the event
}

