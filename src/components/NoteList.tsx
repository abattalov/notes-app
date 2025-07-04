import NoteCard from "./NoteCard";
import type { Note } from "./../types";

type NoteListProps = {
    notes: Note[];
} 

export default function NotesList(props: NoteListProps){

    const notesArr = props.notes.map((note) => {
        return <NoteCard note={note} key={note.id}/>
    })
    
    return (
        <div className="notes-cont">
            {notesArr}
        </div>
    )
}