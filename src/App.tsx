// import { useState } from 'react'
import './App.css'
import './components/SidePanel.css'
import SidePanel from './components/SidePanel'
import TextArea from './components/TextArea'
import { useState, useCallback, useRef } from 'react'

function App() {

  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(true)
  const [noteContent, setNoteContent] = useState<string>("")
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen)
  }

  
  const openNote = (id: number) => {
    
    if(currentNoteId && noteContent){
      saveNote(currentNoteId, noteContent)
    }

    if(saveTimeoutRef.current){
      clearTimeout(saveTimeoutRef.current)
    }

    setCurrentNoteId(id);

    const fetchNote = async () => {
      try{
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
          const data = await response.json();
          console.log(data)
          setNoteContent(data.content)
      } catch(error){
          setError(error instanceof Error ? error.message : "Unknown error")
      }
    }

    fetchNote();
  }

  const handleContentChange = useCallback((content: string) => {
    setNoteContent(content)

    if(saveTimeoutRef.current){
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(async () => {
      if(currentNoteId){
        await saveNote(currentNoteId, content)
      }
    }, (3000))
  }, [currentNoteId]);

  const saveNote = async (id: number, content: string) => {
    try{

      await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

    } catch(error){
      setError(error instanceof Error ? error.message : "Unknown error")
    }
  }

  return (
    <div className='main-cont'>
      <SidePanel 
        isOpen={sidePanelOpen} 
        openNote={openNote}/>
      <TextArea 
        isFullscreen={!sidePanelOpen} 
        toggleSidePanel={toggleSidePanel} 
        noteContent={noteContent} 
        onContentChange={handleContentChange}/>
    </div>
  )
}

export default App
