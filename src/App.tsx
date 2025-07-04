// import { useState } from 'react'
import './App.css'
import './components/SidePanel.css'
import SidePanel from './components/SidePanel'
import TextArea from './components/TextArea'
import { useState } from 'react'

function App() {

  const [sidePanelOpen, setSidePanelOpen] = useState<boolean>(true)

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen)
  }

  return (
    <div className='main-cont'>
      <SidePanel isOpen={sidePanelOpen}/>
      <TextArea isFullscreen={!sidePanelOpen} toggleSidePanel={toggleSidePanel}/>

    </div>
  )
}

export default App
