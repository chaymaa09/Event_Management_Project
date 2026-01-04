CREATE TABLE IF NOT EXISTS category (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    image_url VARCHAR(500)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS category_subscribers (
    user_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, category_id),
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add a foreign key column on event for the new Category entity
ALTER TABLE event ADD COLUMN IF NOT EXISTS category_id BIGINT NULL;

ALTER TABLE event
    ADD CONSTRAINT IF NOT EXISTS fk_event_category
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL;

-- Seed default categories matching the previous enum values
INSERT INTO category (name, image_url) VALUES
    ('TECH', NULL),
    ('AI', NULL),
    ('ART_CULTURE', NULL),
    ('CLIMATE', NULL),
    ('WELLNESS', NULL),
    ('CYBER_SECURITY', NULL),
    ('FITNESS', NULL),
    ('PARTY', NULL),
    ('CRYPTO', NULL)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Backfill event.category_id from existing string column when possible
UPDATE event e
JOIN category c ON UPPER(e.category) = c.name
SET e.category_id = c.id
WHERE e.category_id IS NULL AND e.category IS NOT NULL;
