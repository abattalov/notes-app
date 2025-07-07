import type { Note } from "./../types";
import "./Notecard.css"

type NoteCardProps = {
    note: Note;
    openNote: (id: number) => void;
    deleteNote: (id: number) => void;
}

export default function NoteCard(props: NoteCardProps){

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.deleteNote(props.note.id);
    }

    return (
        <>
            <div className="notecard-cont" onClick={() => props.openNote(props.note.id)}>
                <h4>{props.note.title}</h4>
                <h5>first 100 chars of note will go here...</h5>
                <h5>{props.note.updated_at}</h5>
                <button onClick={handleDelete}>x</button>
            </div>
        </>
    )
}