import { Request, Response } from 'express';
import { ListAllBooksUseCase } from '../../../application/use-cases/ListAllBooksUseCase';

export class ListAllBooksController {
    constructor(
        private listAllBooksUseCase: ListAllBooksUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const books = await this.listAllBooksUseCase.execute();

            return response.status(200).json(books);

        } catch (error: any) {
            return response.status(500).json({
                message: error.message || 'Erro inesperado ao listar livros.',
            });
        }
    }
}