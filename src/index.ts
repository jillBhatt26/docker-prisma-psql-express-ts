import express, { Application, Response } from 'express';
import os from 'os';
import appRouter from './router';
import 'dotenv/config';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT: number = parseInt(process.env.PORT!);

app.get('/', (_, res: Response) => {
    return res.status(200).json({ hello: 'world' });
});

app.get('/host', (_, res: Response) => {
    return res.status(200).json({ host: os.hostname() });
});

app.listen(PORT, () => {
    console.log(`Server live on: ${PORT}...`);
});

app.use(appRouter);
