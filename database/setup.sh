#!/bin/bash

# ANSI color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No color

# Function to display an error message in red and exit
error_exit() {
  echo -e "${RED}Error: ${NC}$1"
  exit 1
}

# Function to display a success message in green
success_message() {
  echo -e "${GREEN}$1${NC}"
}

# Source the .env file
echo "Loading environment variables..."
if [ -f ".env" ]; then
  source .env
else
  error_exit ".env file not found!"
fi

# Check if required environment variables are set
echo "Checking environment variables..."
REQUIRED_VARS=("DB_HOST" "DB_PORT" "DB_USER" "DB_PASSWORD" "DB_NAME")
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    error_exit "Missing required environment variable: $var"
  fi
done

# Check if PostgreSQL is installed
if ! command -v psql >/dev/null 2>&1; then
  error_exit "PostgreSQL is not installed. Please install it and try again."
fi

# Create the database if it doesn't exist
echo "Setting up the database..."
DB_EXISTS=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -w "$DB_NAME" | wc -l)
if [ "$DB_EXISTS" -eq 0 ]; then
  PGPASSWORD=$DB_PASSWORD createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" || error_exit "Failed to create the database."
  success_message "Database '$DB_NAME' created successfully."
else
  echo -e "${YELLOW}Database '$DB_NAME' already exists.${NC}"
fi

# Apply database migrations if migrations folder exists
if [ -d "./migrations" ]; then
  echo "Applying migrations..."
  MIGRATE_CMD="migrate -path ./migrations -database postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable up"
  eval $MIGRATE_CMD || error_exit "Failed to apply migrations."
  success_message "Migrations applied successfully."
else
  echo -e "${YELLOW}No migrations folder found. Skipping migrations.${NC}"
fi

success_message "Setup complete! Database is ready."

