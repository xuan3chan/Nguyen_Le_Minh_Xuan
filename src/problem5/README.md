# TypeScript Express Application

This is a simple Express application using TypeScript, MongoDB, and environment variables. The application includes basic user routes and is designed to run with MongoDB as the database.

## Requirements

- Node.js
- npm or yarn
- MongoDB instance (local or cloud)

## Setup

### 1. Install Dependencies

First, clone the repository and navigate into the project folder.

```bash
git clone <repository-url>
cd <project-folder>
```

Then, install the required dependencies:

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

### 2. Create the .env File

Create a `.env` file in the root directory (same level as `package.json`). Add the following variables to the file:

```ini
DB_URI=<MongoDB URI>
PORT=3101
```

Replace `<MongoDB URI>` with your MongoDB URI, either local (e.g., `mongodb://localhost:27017/mydb`) or the cloud URI provided to you in email.

### 3. Run the Application

To run the server, use the following command:

```bash
nodemon server
```

This will start the server using nodemon, which will automatically restart the server on code changes.

### 4. Access the Application

Once the server is running, navigate to the following URL in your browser:

```arduino
http://localhost:3101
```

You should see the message: "Hello TypeScript with Express!"

### 5. API Endpoints

- `POST /api/user/create-user`: Create a new user
- `GET /api/user/list-user`: List all users with optional filters
- `GET /api/user/get-user/:id`: Get details of a specific user by ID
- `PUT /api/user/update-user/:id`: Update user information
- `DELETE /api/user/delete-user/:id`: delete user

### 6. Environment Configuration

The `.env` file should look like this:

```ini
DB_URI=mongodb+srv://your-mongodb-username:your-mongodb-password@cluster0.mongodb.net/your-database-name
PORT=3101
```