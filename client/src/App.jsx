import './App.css'
import Vacation from './pages/Vacation'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vacation />} />
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App
