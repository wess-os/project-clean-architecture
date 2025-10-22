import { Book } from '../entities/Book';

export interface IBookRepository {
    findByIsbn(isbn: string): Promise<Book | null>;
    save(book: Book): Promise<void>;
    findById(id: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
}