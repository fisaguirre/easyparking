import "./App.css";
import Sidebar from "./components/sideBar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyRoutes } from "./routers/MyRoutes";
function App() {
  return (
    /*
      aca pongo el sidebar modo admin/tarjetero
      sino pongo la condicion if or not, dentro el sidebar y afuera las routes y asi no repito
      */
    <div className="MainApp">
      <Router>
        <Sidebar />
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
