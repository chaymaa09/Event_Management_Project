package com.example.eventmangementproject.dao.entities;

public enum ParticipationStatus {
    CONFIRMED,      // Registration confirmed
    WAITING,        // dans la liste d'attente
    CANCELLED,      // User cancelled
    PENDING,        // Il attent la confirmation de créateur
    BLOCKED,        // Organizer rejected or blocked
    ATTENDED        // User attended the event
}

