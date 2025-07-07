// import { useState } from 'react'
import './App.css'
import './components/SidePanel.css'
import SidePanel from './components/SidePanel'
import TextArea from './components/TextArea'
import type { Note } from './types'
import { useState, useCallback, useRef, useEffect } from 'react'

function App() {

  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(true)
  const [noteContent, setNoteContent] = useState<string>("")
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null)
  const [notes, setNotes] = useState<Note[]>([]);
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, noteId: number | null}>({isOpen: false, noteId: null});

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchNotes();
  }, [])

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

  const createNewNote = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          title: "New Note",
          content: '',
          tags: []
        })
      })

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNote = await response.json();

      await fetchNotes();

      openNote(newNote.id)

    } catch(error){
      setError(error instanceof Error ? error.message : "Uknown error")
    }
  }

  const deleteNote = async (id: number) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
      })

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      await fetchNotes();

    } catch(error){
      setError(error instanceof Error ? error.message : "Unkown error");
    }
  }

  const openDeleteModal = (noteId: number) => {
    setDeleteModal({isOpen: true, noteId})
  };

  const closeDeleteModal = () => {
    setDeleteModal({isOpen: false, noteId: null})
  };

  const confirmDelete =  async () => {
    if (deleteModal.noteId){
      await deleteNote(deleteModal.noteId)
      closeDeleteModal();
    }

  }

  return (
    <>
      <div className='main-cont'>
        <SidePanel 
          notes={notes}
          isOpen={sidePanelOpen} 
          openNote={openNote}
          createNewNote={createNewNote}
          deleteNote={openDeleteModal}
          error={error}
          loading={loading}/>
        <TextArea 
          isFullscreen={!sidePanelOpen} 
          toggleSidePanel={toggleSidePanel} 
          noteContent={noteContent} 
          onContentChange={handleContentChange}/>
      </div>
      {deleteModal.isOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Note</h3>
            <p>Are you sure you want to delete this note? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button onClick={confirmDelete} className="delete-btn">Delete</button>
              <button onClick={closeDeleteModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
    
  )
}

export default App
