User Profile Service
1. Security Choices

JWT (JSON Web Token)
Used for stateless authentication; ensures users can securely access protected endpoints. Tokens include expiry and can be invalidated.

Password Hashing
Passwords are hashed (e.g., using bcrypt) before being stored in the database to prevent plaintext exposure.

2. Data Flow

User submits login or register form.

Frontend sends an API request to the backend (/auth/login or /auth/register).

Backend validates the input, hashes passwords, and stores/fetches user data.

Backend returns a JWT and user information.

Frontend stores the JWT (e.g., in localStorage) and sets authentication context.

Authenticated requests include JWT in headers for protected routes.

Audit logs capture user actions (login, profile updates) in the database.

3. Database Schema
use test;

-- users table
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) DEFAULT NULL,
  bio TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- audit_logs table
CREATE TABLE audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  action VARCHAR(100) NOT NULL,
  details JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

Relationships:

One-to-many from users → audit_logs (a user can have multiple logs)

4. Architecture
Frontend (React + Vite)
        |
        v
Backend (Node.js + Express)
        |
        v
Database (MySQL)


JWT-based authentication secures endpoints.

Backend handles password hashing, validation, and audit logging.

Frontend manages authentication context using JWT.