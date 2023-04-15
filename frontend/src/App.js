import "./App.css";
import Sidebar from "./components/sideBar/Sidebar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyRoutes } from "./routers/MyRoutes";
function App() {
  return (
    <div className="MainApp">
      <Router>
        <ToastContainer
          limit={4}
          rtl={false}
          pauseOnFocusLoss={true}
          pauseOnHover={false}
        />

        <Sidebar />
        <MyRoutes />
      </Router>
    </div>
  );
}

export default App;
