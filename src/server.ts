import express from 'express';
import { bookRoutes } from './infrastructure/http/routes/book.routes';

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use('/api', bookRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});