#!/bin/bash

# ANSI color codes
RED='\033[1;31m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
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

# Function to display an info message in blue
info_message() {
  echo -e "${BLUE}$1${NC}"
}

# Function to display a warning message in yellow
warning_message() {
  echo -e "${YELLOW}$1${NC}"
}

# Source the .env file
info_message "Loading environment variables..."
if [ -f ".env" ]; then
  source .env
else
  error_exit ".env file not found!"
fi

# Check if required environment variables are set
info_message "Checking environment variables..."
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

# Check if migrate tool is installed
if ! command -v migrate >/dev/null 2>&1; then
  error_exit "golang-migrate is not installed. Please install it and try again."
fi

# Construct database URL
DB_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable"

# Create the database if it doesn't exist
info_message "Setting up the database..."
DB_EXISTS=$(psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -lqt | cut -d \| -f 1 | grep -w "$DB_NAME" | wc -l)
if [ "$DB_EXISTS" -eq 0 ]; then
  PGPASSWORD=$DB_PASSWORD createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" || error_exit "Failed to create the database."
  success_message "Database '$DB_NAME' created successfully."
else
  warning_message "Database '$DB_NAME' already exists."
fi

# Handle migrations if migrations folder exists
if [ -d "./migrations" ]; then
  info_message "Handling migrations..."
  
  # First, try to drop all tables (force down all migrations)
  info_message "Rolling back all existing migrations..."
  migrate -path ./migrations -database "$DB_URL" down -all
  
  if [ $? -eq 0 ]; then
    success_message "Successfully rolled back all migrations."
  else
    warning_message "No migrations to roll back or error occurred during rollback."
    # If error was due to no migration table, that's fine, we'll create it in the next step
  fi
  
  # Apply all migrations
  info_message "Applying all migrations..."
  migrate -path ./migrations -database "$DB_URL" up || error_exit "Failed to apply migrations."
  success_message "All migrations applied successfully."
else
  error_exit "No migrations folder found. Please create a migrations folder with your migration files."
fi

# Verify database connection and migrations
info_message "Verifying database setup..."
if psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c '\dt' >/dev/null 2>&1; then
  success_message "Database connection verified successfully."
else
  error_exit "Failed to connect to database after setup."
fi

success_message "Setup complete! Database is ready for use."
