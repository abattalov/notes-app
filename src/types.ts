export type Note = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    is_archived: boolean;
}