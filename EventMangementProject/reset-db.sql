-- Reset Database Script
-- This will drop and recreate the database cleanly

DROP DATABASE IF EXISTS `event-management`;
CREATE DATABASE `event-management` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- The database is now clean. Restart your Spring Boot application to run all Flyway migrations from scratch.
