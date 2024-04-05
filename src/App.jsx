import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ProtectedRoute from './ProtectedRoute'
import Navbar from './components/navbar'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import global_es from './translations/es/global.json'
import global_en from './translations/en/global.json'
import "flag-icons/css/flag-icons.min.css";
i18next.init({
  interpolation: { escapeValue: false }, // not needed for react as it does escaping by default
  lng: "es",
  resources: {
    es: {
      global: global_es
    },
    en: {
      global: global_en
    }
  }
})
function App() {
  return (
    <I18nextProvider i18n={i18next} >
      <AuthProvider >
        <BrowserRouter >
          <Navbar />
          <div className=' dark:bg-slate-800'>
            <div className='sm:ml-20 sm:mr-20'>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage> </LoginPage>} />
                <Route path="/register" element={<RegisterPage></RegisterPage>} />ß

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<h1>Profile</h1>} />
                </Route>

              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </I18nextProvider>
  )
}

export default App