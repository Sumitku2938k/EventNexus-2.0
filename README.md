# EventNexus 2.0

EventNexus 2.0 is a platform designed to manage and discover events efficiently. It features user authentication with role-based access control, allowing administrators to create events and students to view them.

## Features

- **User Authentication**: Secure signup and login functionality using JSON Web Tokens (JWT) and bcrypt for password hashing.
- **Role-Based Access Control**:
  - **Student**: Default role for users to browse events.
  - **Admin**: Privileged role to create and manage events.
- **Event Management**: Comprehensive event tracking including dates, venues, registration fees, and categories.
- **Data Relationships**: Events are linked to the specific Admin user who created them.

## Tech Stack

- **Runtime**: Node.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken), bcrypt

## Database Models

### User Model
Stores user information and handles authentication.
- **Fields**: `name`, `email` (unique), `password` (hashed), `role` ('student' or 'admin').
- **Security**: Passwords are automatically hashed before saving.

### Event Model
Stores details about specific events.
- **Fields**: 
  - `name`, `description`, `date`, `venue`, `category`
  - `registrationFee` (default: 0)
  - `poster` (URL)
  - `maxParticipants`
  - `createdBy` (Reference to User)

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB instance (local or cloud).

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd "EventNexus 2.0"
    ```

2.  **Install Dependencies**
    Navigate to the server directory and install packages:
    ```bash
    cd server
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server` directory with the following variables:
    ```env
    PORT=8080
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET_KEY=your_secret_key
    ```

4.  **Run the Server**
    ```bash
    npm start
    ```
