import express from 'express';
import profileRoutes from './routes/profile.routes';

const app = express();
app.use(express.json());

app.use('/me', profileRoutes);

app.use((req, res) => res.status(404).send('Not Found'));

export default app;
