import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>}/>
      <Route path="/login" element={<LoginPage> </LoginPage>}/>
      <Route path="/register" element={<RegisterPage></RegisterPage>}/>
      <Route path="/profile" element={<h1>Profile</h1>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App