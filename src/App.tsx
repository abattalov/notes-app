// import { useState } from 'react'
import './App.css'
import './components/SidePanel.css'
import SidePanel from './components/SidePanel'
import TextArea from './components/TextArea'

function App() {

  return (
    <div className='main-cont'>

      <div className='sidepanel-cont'>
        <SidePanel/>
      </div>

      <TextArea/>
      
    </div>
  )
}

export default App
