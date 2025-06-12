import express, { Request, Response } from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import validationRoutes from './routes/validationRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

//Setup middleware
app.use(cors());
app.use(express.json());

//set up seperate routes
app.use('/api', dataRoutes);
app.use('/api', validationRoutes);

//Default route
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the Express API!');
});

//Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// I used postman to test the API
// I sent a POST request to http://localhost:3000/api/data with a JSON body
