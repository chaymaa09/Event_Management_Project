#!/bin/bash

# Database Export Script
# This script exports the event-management database structure and data

# Configuration
DB_NAME="event-management"
DB_USER="root"
DB_PASSWORD="root"
DB_HOST="localhost"
DB_PORT="3306"
BACKUP_DIR="database-backup"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/event-management-$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "Starting database export..."
echo "Database: $DB_NAME"
echo "Output: $BACKUP_FILE"

# Export database
mysqldump -h "$DB_HOST" \
  -P "$DB_PORT" \
  -u "$DB_USER" \
  -p"$DB_PASSWORD" \
  --databases "$DB_NAME" \
  --add-drop-database \
  --routines \
  --triggers \
  --events \
  --single-transaction \
  --quick \
  --lock-tables=false \
  > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Database exported successfully!"
  echo "File: $BACKUP_FILE"
  echo "Size: $(du -h "$BACKUP_FILE" | cut -f1)"
  
  # Create a symlink to latest backup
  ln -sf "$(basename "$BACKUP_FILE")" "$BACKUP_DIR/latest.sql"
  echo "Symlink created: $BACKUP_DIR/latest.sql"
else
  echo "❌ Export failed!"
  exit 1
fi
