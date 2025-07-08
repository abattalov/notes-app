import NotesList from "./NoteList"
import Searchbar from "./Searchbar"
import "./SidePanel.css"
import type { NoteListItem } from './../types';

export type SidePanelProps = {
    notes: NoteListItem[];
    isOpen: boolean;
    error: string | null;
    loading: boolean;
    openNote: (id: number) => void;
    deleteNote: (id: number) => void;
    createNewNote: () => void;
}

export default function SidePanel(props: SidePanelProps){

    if(props.loading) return <div>Loading...</div>
    if(props.error) return <div>Error: {props.error}</div>

    return (
            <div className={props.isOpen ? "sidepanel-open" : "sidepanel"}>
                <h1>My Notes</h1>
                <Searchbar/>
                <button onClick={props.createNewNote}>+</button>
                <NotesList notes={props.notes} openNote={props.openNote} deleteNote={props.deleteNote}/>
            </div>
    )
}