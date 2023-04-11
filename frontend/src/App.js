import "./App.css";
import Sidebar from "./components/sideBar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyRoutes } from "./routers/MyRoutes";
function App() {
  return (
    <div className="MainApp">
      <Router>
        <Sidebar />
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
