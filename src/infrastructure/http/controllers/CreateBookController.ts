import { Request, Response } from 'express';
import { CreateBookUseCase } from '../../../application/use-cases/CreateBookUseCase';

export class CreateBookController {
  
    constructor(
        private createBookUseCase: CreateBookUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { title, author, isbn, pages } = request.body;

            const result = await this.createBookUseCase.execute({
                title,
                author,
                isbn,
                pages,
            });

            return response.status(201).json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Erro inesperado ao criar livro.',
            });
        }
    }
}