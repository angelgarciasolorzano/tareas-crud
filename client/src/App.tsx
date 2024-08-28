import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TareasProvider } from "./context/TareasContext";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import TareasPage from "./pages/TareasPage";
import TareaRegisterPage from "./pages/TareaRegisterPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Nab from "./components/Nab";
import RutasProtegidas from "./RutasProtegidas";

function App() {
  return (
    <AuthProvider>
      <TareasProvider>
        <BrowserRouter>
          <main className="w-full min-h-screen mx-auto">
            <Nab />
            <Routes>
              <Route path='/' element={ <HomePage /> } />
              <Route path='/login' element={ <LoginPage /> } />
              <Route path="/register" element={ <RegisterPage /> } /> 

              <Route element={ <RutasProtegidas /> }>
                <Route path='/tareas' element={ <TareasPage /> } />
                <Route path="/tareas-register" element={ <TareaRegisterPage /> } />
                <Route path="/tareas/:id" element={ <TareaRegisterPage /> } />
              </Route>
            </Routes>
            <Toaster position="top-left" reverseOrder={true} />
          </main>
        </BrowserRouter>
      </TareasProvider>
    </AuthProvider>
  )
}

export default App;