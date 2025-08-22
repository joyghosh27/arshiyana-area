
-- Create database
CREATE DATABASE IF NOT EXISTS ashiyana_design_world;
USE ashiyana_design_world;

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create office_users table
CREATE TABLE IF NOT EXISTS office_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin into office_users
INSERT INTO office_users (email, password) VALUES (
    'admin@example.com',
    '$2y$10$dyuG.PsB1f8PYKshw7fTIe1w2dFzKlnmYc4COZqysQRbZOK5r1JeK'
);
