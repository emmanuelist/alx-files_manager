# Files Manager

## Table of Contents

- [Files Manager](#files-manager)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [System Architecture](#system-architecture)
  - [Setup and Installation](#setup-and-installation)
  - [Running the Application](#running-the-application)
  - [API Endpoints](#api-endpoints)
    - [User Management](#user-management)
    - [Authentication](#authentication)
    - [File Operations](#file-operations)
    - [System Information](#system-information)
  - [Database Schema](#database-schema)
    - [Users Collection](#users-collection)
    - [Files Collection](#files-collection)
  - [File Storage](#file-storage)
  - [Authentication](#authentication-1)
  - [Background Jobs](#background-jobs)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [Error Handling](#error-handling)
  - [Security Considerations](#security-considerations)
  - [Performance Optimization](#performance-optimization)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)

## Project Overview

The Files Manager is a robust back-end application that implements a comprehensive file management system. It serves as a learning project to integrate various technologies and concepts including authentication, NodeJS, MongoDB, Redis, pagination, and background processing. The system allows users to upload, retrieve, and manage files with features like permissions and image thumbnail generation.

## Features

1. **User Management**

   - User registration with email and password
   - User authentication and token-based sessions
   - User profile retrieval

2. **File Operations**

   - File upload (including support for regular files, images, and folders)
   - File retrieval by ID
   - Listing files with pagination
   - Updating file publicity status
   - Retrieving file content

3. **File Permissions**

   - Public/private file settings
   - Owner-based access control

4. **Image Processing**

   - Automatic thumbnail generation for image files
   - Multiple thumbnail sizes (500px, 250px, 100px width)

5. **System Information**

   - API status endpoint
   - System statistics (user count, file count)

6. **Background Processing**
   - Asynchronous thumbnail generation
   - Welcome email sending (simulated)

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: Database for storing user and file metadata
- **Redis**: In-memory data structure store for caching and session management
- **Bull**: Queue system for managing background jobs
- **ES6**: Modern JavaScript features
- **SHA1**: For password hashing
- **mime-types**: For file type detection
- **image-thumbnail**: For generating image thumbnails
- **uuid**: For generating unique identifiers
- **Mocha**: Testing framework (optional)

## System Architecture

The Files Manager follows a modular architecture:

1. **API Layer**: Express.js routes and controllers
2. **Service Layer**: Business logic implementation
3. **Data Access Layer**: MongoDB and Redis clients
4. **Background Processing**: Bull queues and workers
5. **File Storage**: Local file system

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/emmanuelist/alx-files_manager.git
   cd alx-files_manager
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up MongoDB:

   - Install MongoDB
   - Start MongoDB service
   - Create a new database for the project

4. Set up Redis:

   - Install Redis
   - Start Redis server

5. Configure environment variables:
   - Create a `.env` file in the project root
   - Add the following variables:
     ```
     PORT=5000
     DB_HOST=localhost
     DB_PORT=27017
     DB_DATABASE=files_manager
     FOLDER_PATH=/tmp/files_manager
     REDIS_URL=redis://localhost:6379
     ```

## Running the Application

1. Start the main server:

   ```
   npm run start-server
   ```

2. Start the worker for background jobs:
   ```
   npm run start-worker
   ```

## API Endpoints

### User Management

- `POST /users`: Create a new user
- `GET /users/me`: Get current user information

### Authentication

- `GET /connect`: Sign in and get an authentication token
- `GET /disconnect`: Sign out (invalidate token)

### File Operations

- `POST /files`: Upload a new file
- `GET /files/:id`: Get file information
- `GET /files`: List files (with pagination)
- `PUT /files/:id/publish`: Make a file public
- `PUT /files/:id/unpublish`: Make a file private
- `GET /files/:id/data`: Get file content (with optional size for images)

### System Information

- `GET /status`: Check API status
- `GET /stats`: Get system statistics

Detailed API documentation with request/response examples can be found in the `docs/api.md` file.

## Database Schema

### Users Collection

- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed)

### Files Collection

- `_id`: ObjectId
- `userId`: ObjectId (reference to Users collection)
- `name`: String
- `type`: String (file, folder, or image)
- `parentId`: ObjectId (reference to Files collection, 0 for root)
- `isPublic`: Boolean
- `localPath`: String (for type file or image)

## File Storage

Files are stored in the local file system. The base path is defined by the `FOLDER_PATH` environment variable. Each file is stored with a UUID as its filename to prevent conflicts.

## Authentication

The system uses token-based authentication:

1. User logs in with email/password
2. Server generates a token and stores it in Redis
3. Client includes the token in the `X-Token` header for authenticated requests

Tokens expire after 24 hours.

## Background Jobs

Background jobs are managed using Bull queues:

1. `fileQueue`: Handles thumbnail generation for uploaded images
2. `userQueue`: Handles sending welcome emails to new users (simulated)

Jobs are processed by the worker defined in `worker.js`.

## Testing

Run the test suite with:

```
npm test
```

Tests cover:

- Redis client functionality
- MongoDB client functionality
- API endpoints
- Worker processes

## Project Structure

```
alx-files_manager/
├── controllers/
│   ├── AppController.js
│   ├── AuthController.js
│   ├── FilesController.js
│   └── UsersController.js
├── models/
│   ├── File.js
│   └── User.js
├── routes/
│   └── index.js
├── utils/
│   ├── db.js
│   ├── redis.js
│   └── file.js
├── workers/
│   └── thumbnail.js
├── tests/
├── server.js
├── worker.js
├── package.json
└── README.md
```

## Error Handling

The application uses a centralized error handling mechanism. All errors are logged, and appropriate HTTP status codes are sent to the client. Detailed error messages are included in the response for easier debugging and better user experience.

## Security Considerations

1. Passwords are hashed using SHA1 before storage
2. Authentication tokens are randomly generated and stored in Redis
3. File permissions are strictly enforced
4. Input validation is performed on all API endpoints
5. Rate limiting is implemented to prevent abuse

## Performance Optimization

1. Caching frequently accessed data in Redis
2. Using indexes in MongoDB for faster queries
3. Implementing pagination for large data sets
4. Asynchronous processing of heavy tasks (like image thumbnail generation)

## Troubleshooting

Common issues and their solutions:

1. **Connection errors**: Ensure MongoDB and Redis are running and accessible
2. **File upload failures**: Check `FOLDER_PATH` permissions
3. **Worker not processing jobs**: Verify Redis connection and worker process status

For more issues, consult the `docs/troubleshooting.md` file.

## Contributing

We welcome contributions! Please see `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Acknowledgements

- ALX Africa for the project requirements and guidance
- All open-source libraries used in this project
