export interface BookSummaryDTO {
    id: string;
    title: string;
    author: string;
}

export type ListAllBooksResponseDTO = BookSummaryDTO[];