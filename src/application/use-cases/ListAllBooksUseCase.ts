import { IBookRepository } from '../../domain/repositories/IBookRepository';
import { ListAllBooksResponseDTO, BookSummaryDTO } from '../dtos/ListAllBooksDTO';

export class ListAllBooksUseCase {
  
    constructor(
        private bookRepository: IBookRepository
    ) {}

    async execute(): Promise<ListAllBooksResponseDTO> {
        const books = await this.bookRepository.findAll();

        const response: ListAllBooksResponseDTO = books.map(book => {
            return {
                id: book.id,
                title: book.props.title,
                author: book.props.author,
            };
        });

        return response;
    }
}