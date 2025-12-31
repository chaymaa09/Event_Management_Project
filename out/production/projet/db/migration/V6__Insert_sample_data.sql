-- Users (with BCrypt hashed passwords for 'password123')
-- BCrypt hash for "password123": $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
INSERT INTO user (id, name, email, password, auth_type, avatar_url, enabled, account_non_expired, account_non_locked, credentials_non_expired)
VALUES
    (1, 'Alice Johnson', 'alice@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'LOCAL', 'https://randomuser.me/api/portraits/women/1.jpg', TRUE, TRUE, TRUE, TRUE),
    (2, 'Bob Smith', 'bob@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'LOCAL', 'https://randomuser.me/api/portraits/men/2.jpg', TRUE, TRUE, TRUE, TRUE),
    (3, 'Charlie Davis', 'charlie@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'LOCAL', 'https://randomuser.me/api/portraits/men/3.jpg', TRUE, TRUE, TRUE, TRUE),
    (4, 'Dana Lee', 'dana@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'LOCAL', 'https://randomuser.me/api/portraits/women/4.jpg', TRUE, TRUE, TRUE, TRUE);

-- Locations
INSERT INTO location (id, name, street, city, region, country, postal_code, latitude, longitude, timezone, additional_infos)
VALUES
    (1, 'Grand Conference Hall', '123 Main St', 'New York', 'NY', 'USA', '10001', 40.712800, -74.006000, 'America/New_York', 'Building A, Floor 5'),
    (2, 'Tech Park Auditorium', '456 Innovation Dr', 'San Francisco', 'CA', 'USA', '94107', 37.774900, -122.419400, 'America/Los_Angeles', 'Near Gate 3'),
    (3, 'Virtual Event Platform', 'Online', 'Virtual', NULL, 'Online', NULL, NULL, NULL, 'UTC', 'Zoom/Meet platform');

-- Tags
INSERT INTO tag (id, tag_name) 
VALUES
    (1, 'Tech'),
    (2, 'Networking'),
    (3, 'Workshop'),
    (4, 'Conference'),
    (5, 'Virtual');

-- Events (with pricing and poster URLs)
INSERT INTO event (id, title, description, creation_date, start_date, end_date, is_private, is_virtual, virtual_link, capacity, waiting_list_enabled, requires_approval, price, category, poster_url, creator_id, location_id)
VALUES
    (1, 'AI Conference 2025', 'An in-depth conference on Artificial Intelligence trends.', '2026-01-01 10:00:00', '2026-01-20 09:00:00', '2026-01-22 17:00:00', FALSE, FALSE, NULL, 500, TRUE, TRUE, 299.00, 'Learn', '/assets/Artificial-Intelligence-Conference-2025-1.jpg', 1, 1),
    (2, 'Startup Networking Night', 'Meet and connect with local startups and entrepreneurs.', '2026-02-02 15:00:00', '2026-02-18 18:00:00', '2026-02-18 22:00:00', FALSE, FALSE, NULL, 200, TRUE, FALSE, 49.00, 'Connect', '/assets/networking-night.jpg', 2, 2),
    (3, 'Online Python Workshop', 'Hands-on Python workshop online.', '2026-03-03 08:00:00', '2026-03-15 10:00:00', '2026-03-15 14:00:00', FALSE, TRUE, 'https://zoom.us/j/123456789', 100, FALSE, FALSE, 19.99, 'Learn', '/assets/python-workshop.jpg', 3, 3);

-- Event-Tag relationships
INSERT INTO tag_events (event_id, tag_id)
VALUES
    (1, 1), -- AI Conference → Tech
    (1, 4), -- AI Conference → Conference
    (2, 2), -- Startup Networking → Networking
    (2, 4), -- Startup Networking → Conference
    (3, 3), -- Python Workshop → Workshop
    (3, 5); -- Python Workshop → Virtual

-- Participations
INSERT INTO participation (id, status, registration_date, user_id, event_id)
VALUES
    (1, 'CONFIRMED', '2025-11-05 12:00:00', 1, 1),
    (2, 'WAITING', '2025-11-06 09:00:00', 2, 1),
    (3, 'CONFIRMED', '2025-11-07 14:00:00', 3, 2),
    (4, 'PENDING', '2025-11-08 10:00:00', 4, 3);
