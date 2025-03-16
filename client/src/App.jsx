import './App.css'
import Vacation from './pages/Vacation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WorldMapDemo from './pages/WorldMapDemo.jsx'
import MacbookScrollDemo from './pages/MacbookScrollDemo.jsx'


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Vacation" element={<Vacation />} />
          <Route path="/" element={<WorldMapDemo />} />
          <Route path="/MacbookScrollDemo" element={<MacbookScrollDemo />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
