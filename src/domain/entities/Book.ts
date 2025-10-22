import { randomUUID } from 'crypto';

export interface BookProps {
    title: string;
    author: string;
    isbn: string;
    pages: number;
    createdAt?: Date;
}

export class Book {
    public readonly id: string;

    public props: Required<BookProps>; // garante que createdAt será preenchido

    private constructor(props: BookProps, id?: string) {
        this.id = id ?? randomUUID();
        
        // assegura que todas as props, incluindo as opcionais, tenham um valor
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };
    }

    public static create(props: BookProps, id?: string): Book {
        if (props.pages <= 0) {
            throw new Error("Um livro deve ter pelo menos 1 página.");
        }

        if (props.title.trim().length < 2) {
            throw new Error("Título é muito curto.");
        }

        return new Book(props, id);
    }

    public get title(): string {
        return this.props.title;
    }

    public updateTitle(newTitle: string): void {
        if (newTitle.trim().length < 2) {
            throw new Error("Título é muito curto.");
        }
        
        this.props.title = newTitle;
    }
}