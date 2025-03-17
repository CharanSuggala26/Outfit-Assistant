import './App.css'
import Vacation from './pages/Vacation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import WorldMapDemo from './pages/WorldMapDemo.jsx'
//import MacbookScrollDemo from './pages/MacbookScrollDemo.jsx'
//import StickyScrollDemo from './pages/StickyScrollDemo.jsx'
import Home from './pages/Home'
import About from './pages/About'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Vacation" element={<Vacation />} />
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
