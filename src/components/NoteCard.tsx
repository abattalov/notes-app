import type { Note } from "./../types";
import "./Notecard.css"

type NoteCardProps = {
    note: Note;
    openNote: (id: number) => void;
}

export default function NoteCard(props: NoteCardProps){

    return (
        <div className="notecard-cont" onClick={() => props.openNote(props.note.id)}>
            <h4>{props.note.title}</h4>
            <h5>{props.note.updated_at}</h5>
        </div>
    )
}