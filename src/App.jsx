import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvdier } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <AuthProvdier>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage> </LoginPage>} />
          <Route path="/register" element={<RegisterPage></RegisterPage>} />ß

          <Route element={<ProtectedRoute />}>

            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvdier>

  )
}

export default App