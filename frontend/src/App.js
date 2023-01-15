import './App.css';
import './myStyle.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Users from "./components/parking-control/Users";
import Navbar from "./pages/Navbar";
import AcreditarTarjeta from "./components/parking-control/admin/AcreditarTarjeta"

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" className="auto" element={<Users />} />
            <Route path="/acreditar" className="auto" element={<AcreditarTarjeta />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
