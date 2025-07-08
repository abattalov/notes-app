import NoteCard from "./NoteCard";
import type { NoteListItem } from "./../types";
import './ NoteList.css'

type NoteListProps = {
    notes: NoteListItem[];
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