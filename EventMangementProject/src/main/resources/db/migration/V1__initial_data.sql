-- Users
INSERT INTO user (id, name, email, password, auth_type, provider, provider_id, avatar_url)
VALUES
       (1, 'Alice Johnson', 'alice@example.com', 'test', 'LOCAL', NULL, NULL, 'https://randomuser.me/api/portraits/women/1.jpg'),
       (2, 'Bob Smith', 'bob@example.com', 'test', 'LOCAL', NULL, NULL, 'https://randomuser.me/api/portraits/men/2.jpg'),
       (3, 'Charlie Davis', 'charlie@example.com', 'test', 'LOCAL', NULL, NULL, 'https://randomuser.me/api/portraits/men/3.jpg'),
       (4, 'Dana Lee', 'dana@example.com', 'test', 'LOCAL', NULL, NULL, 'https://randomuser.me/api/portraits/women/4.jpg');

-- Locations
INSERT INTO location (id, name, street, city, region, country, postal_code, latitude, longitude, timezone, place_id, additional_infos)
VALUES
       (1, 'Grand Conference Hall', '123 Main St', 'New York', 'NY', 'USA', '10001', 40.7128, -74.0060, 'America/New_York', null, 'Building A, Floor 5'),
       (2, 'Tech Park Auditorium', '456 Innovation Dr', 'San Francisco', 'CA', 'USA', '94107', 37.7749, -122.4194, 'America/Los_Angeles', null, 'Near Gate 3'),

-- Tags
INSERT INTO tag (id, tag_name) VALUES
                                   (1, 'Tech'),
                                   (2, 'Networking'),
                                   (3, 'Workshop'),
                                   (4, 'Conference'),
                                   (5, 'Virtual');

-- Events
INSERT INTO event (id, title, description, creation_date, start_date, end_date, is_private, is_virtual, virtual_link, capacity, waiting_list_enabled, requires_approval, creator_id, location_id)
VALUES
      (1, 'AI Conference 2025', 'An in-depth conference on Artificial Intelligence trends.', '2025-11-01T10:00:00Z', '2025-11-20T09:00:00Z', '2025-11-22T17:00:00Z', false, false, NULL, 500, true, true, 1, 1),
      (2, 'Startup Networking Night', 'Meet and connect with local startups and entrepreneurs.', '2025-11-02T15:00:00Z', '2025-11-18T18:00:00Z', '2025-11-18T22:00:00Z', false, false, NULL, 200, true, false, 2, 2),
      (3, 'Online Python Workshop', 'Hands-on Python workshop online.', '2025-11-03T08:00:00Z', '2025-11-15T10:00:00Z', '2025-11-15T14:00:00Z', false, true, 'https://zoom.us/j/123456789', 100, false, false, 3, 3);

-- Event_Tags mapping (many-to-many)
INSERT INTO event_tags (event_id, tag_id)
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
     (1, 'CONFIRMED', '2025-11-05T12:00:00Z', 1, 1),
     (2, 'WAITING', '2025-11-06T09:00:00Z', 2, 1),
     (3, 'CONFIRMED', '2025-11-07T14:00:00Z', 3, 2),
     (4, 'PENDING', '2025-11-08T10:00:00Z', 4, 3);
