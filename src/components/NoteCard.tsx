import type { NoteListItem } from "./../types";
import "./Notecard.css"

type NoteCardProps = {
    note: NoteListItem;
    openNote: (id: number) => void;
    deleteNote: (id: number) => void;
}

export default function NoteCard(props: NoteCardProps){

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        props.deleteNote(props.note.id);
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        //TODO: add logic to edit title and tags
        console.log("put it in reverse Terry!")
    }

    return (
        <>
            <div className="notecard-cont" onClick={() => props.openNote(props.note.id)}>
                <h4>{props.note.title}</h4>
                <h5>{props.note.short_description}</h5>
                <h5>{props.note.updated_at}</h5>
                <div className="button-cont">
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}