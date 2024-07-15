import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TareasPage from "./pages/TareasPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="container mx-auto px-10">
          <Routes>
            <Route path='/' element={ <HomePage /> } />
            <Route path='/login' element={ <LoginPage /> } />
            <Route path='/tareas' element={ <TareasPage /> } />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;