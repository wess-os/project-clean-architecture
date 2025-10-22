import { Router } from 'express';

import { CreateBookController } from '../controllers/CreateBookController';
import { ListAllBooksController } from '../controllers/ListAllBooksController';

import { PrismaBookRepository } from '../../database/prisma/repositories/PrismaBookRepository';

import { CreateBookUseCase } from '../../../application/use-cases/CreateBookUseCase';
import { ListAllBooksUseCase } from '../../../application/use-cases/ListAllBooksUseCase';

const prismaBookRepository = new PrismaBookRepository();

const createBookUseCase = new CreateBookUseCase(prismaBookRepository);
const listAllBooksUseCase = new ListAllBooksUseCase(prismaBookRepository);

const createBookController = new CreateBookController(createBookUseCase);
const listAllBooksController = new ListAllBooksController(listAllBooksUseCase);

const bookRoutes = Router();

bookRoutes.post('/books', (request, response) => {
    return createBookController.handle(request, response);
});

bookRoutes.get('/books', (request, response) => {
    return listAllBooksController.handle(request, response);
});

export { bookRoutes };