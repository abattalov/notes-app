import type { Note } from "./../types";

type NoteCardProps = {
    note: Note;
}

export default function NoteCard(props: NoteCardProps){
    return (
        <div>
            <h4>{props.note.title}</h4>
            <h5>{props.note.updated_at}</h5>
        </div>
    )
}