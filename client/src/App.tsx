import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import TareasPage from "./pages/TareasPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Nab from "./components/Nab";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="w-full h-screen mx-auto">
          <Nab />
          <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/tareas' element={ <TareasPage /> } />
            <Route path="/register" element={ <RegisterPage /> } /> 
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;