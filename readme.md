# Simple Todo API
https://to-do-list-jrkd.onrender.com

## Overview
This project implements a basic API for managing todo items with CRUD operations. It uses Node.js with Express, PostgreSQL for data storage, and optionally integrates with AWS S3 for storing todo item images.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd todo-list
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory with:
   ```dotenv
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/todo_db
   AWS_ACCESS_KEY_ID=your_aws_access_key_id
   AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
   AWS_S3_BUCKET_NAME=your_s3_bucket_name
   ```

4. **Database Setup**
   Ensure PostgreSQL is running locally. Create a database named `todoList`.

5. **Run Migrations**
   ```bash
   npm run generate-and-migrate 
   ```

6. **Start the Server**
   ```bash
   npm run dev
   ```

## API Endpoints

- **POST /todos**: Create a new todo item.
- **GET /todos/:id**: Get details of a specific todo item with days from creation.
- **PUT /todos/:id**: Update an existing todo item.
- **PUT /todos/:id/markComplete**: Update completion state.
- **DELETE /todos/:id**: Delete a todo item.
- **GET /todos**: Get all todo items with filters and sorting.
- **Optional: Image Upload**: Include image with todo creation/update as `multipart/form-data`.

## Testing
- Use tools like curl, Postman, or other API testing tools.

## Error Handling
- Proper error handling and HTTP status codes (404, 400, 500) are implemented.

## Deployment
- Deploy on a hosting platform with appropriate environment variables.

