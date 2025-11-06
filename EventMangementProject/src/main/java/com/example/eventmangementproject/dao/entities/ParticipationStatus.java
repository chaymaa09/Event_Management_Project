package com.example.eventmangementproject.dao.entities;

public enum ParticipationStatus {
    CONFIRMED,
    WAITING,         // dans la liste d'attente
    CANCELLED,
    PENDING,         // Il attent la confirmation de créateur
    BLOCKED
}

