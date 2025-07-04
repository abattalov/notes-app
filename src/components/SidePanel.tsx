import NotesList from "./NoteList"
import Searchbar from "./Searchbar"
import "./SidePanel.css"
import { useEffect } from "react"

export type SidePanelProps = {
    isOpen: boolean
}

export default function SidePanel(props: SidePanelProps){

    useEffect(() => {
        const fetchNotes = async () => {
            try{

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes`);
                const data = await response.json();
                console.log(data);

            } catch(error){
                console.log(error)
            }
        }

        fetchNotes();
    }, [])

    return (
            <div className={props.isOpen ? "sidepanel-open" : "sidepanel"}>
                <h1>My Notes</h1>
                <Searchbar/>
                <NotesList/>
            </div>
    )
}