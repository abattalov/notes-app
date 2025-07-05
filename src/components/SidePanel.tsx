import NotesList from "./NoteList"
import Searchbar from "./Searchbar"
import "./SidePanel.css"
import type { Note } from './../types';
import { useEffect, useState } from "react"

export type SidePanelProps = {
    isOpen: boolean
}

export default function SidePanel(props: SidePanelProps){

    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try{

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);
                const data = await response.json();
                setNotes(data);

            } catch(error){

                setError(error instanceof Error ? error.message : "Unknown error")

            } finally{
                setLoading(false);
            }
        }

        fetchNotes();
    }, [])

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    return (
            <div className={props.isOpen ? "sidepanel-open" : "sidepanel"}>
                <h1>My Notes</h1>
                <Searchbar/>
                <NotesList notes={notes}/>
            </div>
    )
}