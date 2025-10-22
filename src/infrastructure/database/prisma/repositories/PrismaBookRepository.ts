import { PrismaClient } from '@prisma/client';
import { IBookRepository } from '../../../../domain/repositories/IBookRepository';
import { Book } from '../../../../domain/entities/Book';
import { PrismaBookMapper } from '../mappers/PrismaBookMapper';

const prisma = new PrismaClient();

export class PrismaBookRepository implements IBookRepository {
  
    async findByIsbn(isbn: string): Promise<Book | null> {
        const book = await prisma.book.findUnique({
            where: { isbn },
        });

        if (!book) {
            return null;
        }

        return PrismaBookMapper.toDomain(book);
    }

    async save(book: Book): Promise<void> {
        const data = PrismaBookMapper.toPrisma(book);

        await prisma.book.upsert({
            where: { id: data.id },
            update: data,
            create: data,
        });
    }

    async findById(id: string): Promise<Book | null> {
        const book = await prisma.book.findUnique({
            where: { id },
        });

        if (!book) {
            return null;
        }
        
        return PrismaBookMapper.toDomain(book);
    }

    async findAll(): Promise<Book[]> {
        const prismaBooks = await prisma.book.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });

        return prismaBooks.map(prismaBook => PrismaBookMapper.toDomain(prismaBook));
    }
}