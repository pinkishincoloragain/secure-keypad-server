import express, {Request, Response} from 'express';
import mockData from './data/users.json';

// Mock user data
const users = mockData.data;

// Create Express app
const app = express();

// Route handler for '/api/users'
app.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
});

app.get('/api/user/:id', (req: Request, res: Response) => {
    const id = +req.params.id;
    const user = users.find(user => user.userId === id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({error: `User ${id} not found`});
    }
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
