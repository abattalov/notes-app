// import { useState } from 'react'
import './App.css'
import './components/SidePanel.css'
import SidePanel from './components/SidePanel'
import TextArea from './components/TextArea'
import { useState} from 'react'

function App() {

  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(true)

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen)
  }

  const [error, setError] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState<string>("")

  const openNote = (id: number) => {

        const fetchNote = async () => {
          try{

              const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`);
              const data = await response.json();
              console.log(data)
              setNoteContent(data.content)

          } catch(error){

              setError(error instanceof Error ? error.message : "Unknown error")

          } finally{
              console.log('finally... do something')
          }
      }

      fetchNote();
  }

  const onContentChange = (content: string) => {
    setNoteContent(content)
  }

  return (
    <div className='main-cont'>
      <SidePanel isOpen={sidePanelOpen} openNote={openNote}/>
      <TextArea isFullscreen={!sidePanelOpen} toggleSidePanel={toggleSidePanel} noteContent={noteContent} onContentChange={onContentChange}/>

    </div>
  )
}

export default App
