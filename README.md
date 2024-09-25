# Chemical Compound Management Application

A full-stack web application for managing chemical compounds, allowing users to register, log in, and create, view, and manage chemical compounds. The project includes both front-end and back-end functionality, with authentication and authorization to ensure secure user interactions.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [Acknowledgements](#acknowledgements)
9. [Contributing](#contributing)
10. [Contact](#contact)

---

## Project Overview

This project is a simple yet powerful web application designed for chemists and researchers to manage data on chemical compounds. Users can create an account, log in, and add new compounds with details such as molecular weight, formula, and applications. The project includes user authentication and secure access using JSON Web Tokens (JWT) and integrates a MongoDB database for storage.

---

## Features

- **User Authentication:** Secure login and registration system using JWT.
- **Chemical Compound Management:** Add, view, and search for chemical compounds.
- **Responsive Design:** Adaptable UI for different screen sizes.
- **Authorization:** Users must be authenticated to manage compounds.
- **Search Functionality:** Search for compounds based on name or formula.
- **Compound Details View:** Detailed page for each chemical compound.

---

## Tech Stack

### Back-End:
- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose ORM
- **JWT** (JSON Web Tokens) for authentication

### Front-End:
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

### Dev Tools:
- **npm** for package management
- **dotenv** for environment variable management
- **bcrypt.js** for password hashing
- **cors** for enabling cross-origin requests

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v16.x or above)
- **npm** (Node Package Manager)
- **MongoDB** (local instance or MongoDB Atlas)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/chemical-compound-app.git
   cd chemical-compound-app
2. **Install Server Dependencies**
    cd server
    npm install
3. **Install Client Dependencies**
    cd ../client
    npm install
4. **Run the Application:**
    - Start the MongoDB Server:

    If you're using a local MongoDB instance: 
    brew services start mongodb-community@6.0
    brew services list

    If you're using MongoDB Atlas, make sure your cluster is active and accessible.

    - Run the Back-End Server:

    cd ../server
    node server.js

    - Run the Front-End:

    Open a new terminal window or tab and navigate to the client/ directory. Serve the front-end using a simple HTTP server like live-server
        1. Install Live Server Globally (if not already installed):
            npm install -g live-server
        2. Start Live Server:
            cd ../client
            live-server
    Live Server will automatically open your default browser and serve your front-end at http://127.0.0.1:8080 (or another available port).

### Environment Variables

Create a .env file in the server/ directory with the following environment variables:

MONGODB_URI=mongodb://localhost:27017/chemical_compounds
JWT_SECRET=your_jwt_secret_key
PORT=5001

For MongoDB Atlas: MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/chemical_compounds?retryWrites=true&w=majority

### API Endpoints
Authentication Routes:
POST /api/auth/register

Description: Register a new user.
Body Parameters:
username (string, required)
password (string, required)
Response:
Success: { message: "User registered successfully." }
Error: { message: "Error message." }
POST /api/auth/login

Description: Log in and receive a JWT.
Body Parameters:
username (string, required)
password (string, required)
Response:
Success: { token: "JWT_TOKEN" }
Error: { message: "Error message." }
Compound Routes:
GET /api/compounds

Description: Retrieve all chemical compounds.
Headers:
Authorization: Bearer <token>
Response:
Success: Array of compound objects.
Error: { message: "Error message." }
POST /api/compounds

Description: Add a new chemical compound.
Headers:
Authorization: Bearer <token>
Body Parameters:
name (string, required)
formula (string, required)
molecularWeight (number, required)
details (string, required)
applications (array of strings, required)
Response:
Success: Compound object.
Error: { message: "Error message." }
GET /api/compounds/

Description: Get details of a specific compound.
Headers:
Authorization: Bearer <token>
Response:
Success: Compound object.
Error: { message: "Error message." }

### Screenshots

1. Start page
   - client/images/Screenshot 2024-09-25 at 1.26.31 PM.png
2. Registration page
    - client/images/Screenshot 2024-09-25 at 1.26.43 PM.png
3. Login Page
    - client/images/Screenshot 2024-09-25 at 1.26.57 PM.png
4. Add Compound Page
    - client/images/Screenshot 2024-09-25 at 1.27.07 PM.png
5. Compound List
    - client/images/Screenshot 2024-09-25 at 1.27.14 PM.png
6. Compound Description
    - client/images/Screenshot 2024-09-25 at 1.27.19 PM.png

### Acknowledgements
- Node.js
- Express.js
- MongoDB
- Bootstrap 
- Live Server
- dotenv
- bcrypt.js

### Contributing 

Contributions are welcome. Please fork the repository and submit a pull request for any enhancements or bug fixes. 
This is my first project like this and I understand that I have used some outdated tools. feel free to reach out with any advice.

### Contact

For any questions, advice, etc. please email me at IsraelMazon14@gmail.com















