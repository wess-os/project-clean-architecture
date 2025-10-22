export interface CreateBookRequestDTO {
    title: string;
    author: string;
    isbn: string;
    pages: number;
}

export interface CreateBookResponseDTO {
    id: string;
    title: string;
    isbn: string;
}