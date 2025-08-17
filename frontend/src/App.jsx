import Concurrency from './pages/Concurrency'
import { Routes, Route } from 'react-router-dom'
import Entitlements from './pages/Entitlements'
import HomePage from './pages/HomePage'
import FormPage from './pages/FormPage'
// import { BooksProvider } from './BookContext'

function App() {
  return (
    <>
      <Routes>
        <Route path="/concurrency" element={<Concurrency/>}/>
        <Route path="/entitlements" element={<Entitlements/>}/>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/form" element={<FormPage/>}/>
      </Routes>
    
    </>
  )
}

export default App
