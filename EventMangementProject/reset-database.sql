-- Manual database reset script
-- Run this to clear everything and let Flyway rebuild from scratch

DROP DATABASE IF EXISTS `event-management`;
CREATE DATABASE `event-management` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `event-management`;

-- Database is now clean - restart Spring Boot to run all migrations
