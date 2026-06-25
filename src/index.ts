import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import router from './routes';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT ?? 3000;

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
