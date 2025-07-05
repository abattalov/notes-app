import type { Note } from "./../types";
import "./Notecard.css"

type NoteCardProps = {
    note: Note;
}

export default function NoteCard(props: NoteCardProps){

    const openNote = () => {
        console.log(props.note.id)
    }

    return (
        <div className="notecard-cont" onClick={openNote}>
            <h4>{props.note.title}</h4>
            <h5>{props.note.updated_at}</h5>
        </div>
    )
}