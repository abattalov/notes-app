export type Note = {
    id: number;
    title: string;
    content: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    is_archived: boolean;
}

export type NoteListItem = {
    id: number;
    title: string;
    short_description: string;
    tags: string[];
    created_at: string;
    updated_at: string;
    is_archived: boolean;
}