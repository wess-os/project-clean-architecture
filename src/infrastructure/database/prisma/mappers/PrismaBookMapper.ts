import { Book as PrismaBook } from '@prisma/client';
import { Book, BookProps } from '../../../../domain/entities/Book';

export class PrismaBookMapper {
    public static toPrisma(book: Book): PrismaBook {
        return {
            id: book.id,
            title: book.props.title,
            author: book.props.author,
            isbn: book.props.isbn,
            pages: book.props.pages,
            createdAt: book.props.createdAt,
        };
    }

    public static toDomain(raw: PrismaBook): Book {
        const bookProps: BookProps = {
            title: raw.title,
            author: raw.author,
            isbn: raw.isbn,
            pages: raw.pages,
            createdAt: raw.createdAt,
        };
        
        return Book.create(bookProps, raw.id);
    }
}