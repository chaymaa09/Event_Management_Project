CREATE TABLE IF NOT EXISTS notification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    
    -- Message content
    message TEXT NOT NULL,
    
    -- Notification type (e.g., EVENT_REMINDER, REGISTRATION_CONFIRMED, etc.)
    type VARCHAR(50) NOT NULL,
    
    -- Status (READ, UNREAD)
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    
    -- Foreign key to user
    user_id BIGINT NOT NULL,
    
    -- Optional: Link to related event
    event_id BIGINT,
    
    -- Constraints
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
    
    -- Indexes for performance
    INDEX idx_user (user_id),
    INDEX idx_event (event_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at),
    INDEX idx_type (type)
    
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;