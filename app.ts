import express, {Request, Response} from 'express';
import mockData from './data/users.json';
import cors from "cors";


const app = express();
app.use(cors());
app.use(express.json());
const users = mockData.data;

const port = 8080;

function verifyToken(req: Request, res: Response, next: any) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        if (bearerToken === 'secret') {
            next();
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(403);
    }
}

// CORS
app.use((req: Request, res: Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

function serveUsers(res: Response) {
    const date = new Date();
    console.log(date.toLocaleTimeString() + ' - GET /api/users');
    res.json(users);
}

function serveSpecificUser(req: Request, res: Response) {
    const id = +req.params.id;
    const user = users.find(user => user.userId === id);
    if (user) {
        const date = new Date();
        console.log(date.toLocaleTimeString() + ` - GET /api/user/${id}`);
        res.json(user);
    } else {
        res.status(404).json({error: `User ${id} not found`});
    }
}

// Route handler for '/api/users'
app.get('/api/users', verifyToken, (req: Request, res: Response) => {
    serveUsers(res);
});

app.get('/api/user/:id', verifyToken, (req: Request, res: Response) => {
    serveSpecificUser(req, res);
});

// Route handler for '/api/users'
app.get('/slow-api/users', verifyToken, (req: Request, res: Response) => {
    setTimeout(() => {
            serveUsers(res);
        }, 5000
    );
});

app.get('/slow-api/user/:id', verifyToken, (req: Request, res: Response) => {
    setTimeout(() => {
            serveSpecificUser(req, res);
        }, 5000
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
