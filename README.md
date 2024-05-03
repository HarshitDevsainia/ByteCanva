# ByteCanva

ByteCanva is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows administrators to create and post blogs while enabling other users to read the blogs.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **Admin Dashboard**: Administrators have access to a dashboard where they can create, edit, and delete blog posts.
- **User Interface**: Clean and intuitive user interface for seamless navigation and reading experience.
- **Responsive Design**: The application is optimized for various screen sizes, ensuring accessibility across devices.

## Technologies Used

- **MongoDB**: NoSQL database for storing blog posts and user data.
- **Express.js**: Backend framework for building the RESTful API.
- **React.js**: Frontend library for building dynamic user interfaces.
- **Node.js**: JavaScript runtime environment for server-side scripting.
- **Redux**: State management library for managing application state.
- **JWT Authentication**: JSON Web Tokens for secure authentication.
- **Bootstrap**: Frontend framework for responsive design and UI components.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ByteCanva.git
```

2. Navigate to the project directory:

```bash
cd ByteCanva
```

3. Install dependencies for both frontend and backend:

```bash
cd BlogApp
npm install
cd Backend
npm install
```

4. Create a `.env` file in the `server` directory and add the following environment variables:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Start the backend server:

```bash
cd Backend
npm run dev
```

6. Start the frontend development server:

```bash
cd BlogApp
npm run dev
```

7. Open your browser and navigate to `http://localhost:5173` to use the application.

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.
