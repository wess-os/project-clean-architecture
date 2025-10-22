import { Book } from '../../domain/entities/Book';
import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { CreateBookRequestDTO, CreateBookResponseDTO } from '../dtos/CreateBookDTO';

export class CreateBookUseCase {
  
    constructor(
        private bookRepository: IBookRepository
    ) {}

    async execute(data: CreateBookRequestDTO): Promise<CreateBookResponseDTO> {
        // verificar se o livro já existe
        const bookAlreadyExists = await this.bookRepository.findByIsbn(data.isbn);

        if (bookAlreadyExists) {
            throw new Error('Já existe um livro com este ISBN.');
        }

        const book = Book.create({
            title: data.title,
            author: data.author,
            isbn: data.isbn,
            pages: data.pages,
        });

        await this.bookRepository.save(book);

        return {
            id: book.id,
            title: book.props.title,
            isbn: book.props.isbn,
        };
    }
}