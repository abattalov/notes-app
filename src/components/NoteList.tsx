import NoteCard from "./NoteCard";
import type { Note } from "./../types";

type NoteListProps = {
    notes: Note[];
    openNote: (id: number) => void;
    deleteNote: (id: number) => void;
} 

export default function NotesList(props: NoteListProps){

    const notesArr = props.notes.map((note) => {
        return <NoteCard note={note} key={note.id} openNote={props.openNote} deleteNote={props.deleteNote}/>
    })
    
    return (
        <div className="notes-cont">
            {notesArr}
        </div>
    )
}