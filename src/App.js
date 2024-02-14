import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login'
import Tours from "./pages/Tours";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Navigate to='login' replace />} />
          <Route path='/login' element={<Login />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
