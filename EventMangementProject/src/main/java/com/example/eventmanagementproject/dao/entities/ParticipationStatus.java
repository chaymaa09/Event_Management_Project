package com.example.eventmanagementproject.dao.entities;

public enum ParticipationStatus {
    CONFIRMED,      // Registration confirmed - joined for free events
    WAITING,        // dans la liste d'attente
    CANCELLED,      // User cancelled
    PENDING,        // Il attent la confirmation de créateur
    BLOCKED,        // Organizer rejected or blocked
    ATTENDED // User attended the event
}

