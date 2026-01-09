-- Drop `price` column safely on MySQL versions that don't support
-- `ALTER TABLE ... DROP COLUMN IF EXISTS` by checking INFORMATION_SCHEMA.
SET @col_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE table_schema = DATABASE()
    AND table_name = 'event'
    AND column_name = 'price'
);
SET @sql = CASE WHEN @col_exists > 0 THEN 'ALTER TABLE event DROP COLUMN price' ELSE 'SELECT 1' END;
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- If there are any sample-data rows that reference price in other migrations, you may
-- update them here or create an additional migration to normalize sample data.

