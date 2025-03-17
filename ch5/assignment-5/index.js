const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Q1: Nested Routes for User Posts
app.get('/users/:id/posts', (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `Posts for User ID: ${userId}` });
});

// Q2: Organizing User Routes
const usersRouter = express.Router();

// Retrieve all users
usersRouter.get('/', (req, res) => {
    res.status(200).json({ message: 'List of all users' });
});

// Retrieve a single user by ID
usersRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `Details of user ${userId}` });
});

// Create a new user
usersRouter.post('/', (req, res) => {
    res.status(201).json({ message: 'User created successfully' });
});

// Update an existing user by ID
usersRouter.put('/:id', (req, res) => {
    const userId = req.params.id;
    res.status(200).json({ message: `User ${userId} updated successfully` });
});

// Registering the usersRouter under /users path
app.use('/users', usersRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
