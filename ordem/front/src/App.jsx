import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import "./index.css"; 
import Home from "./pages/home";
import Ambientes from "./pages/ambientes";
import Patrimonios from "./pages/patrimonios";
import Manutentores from "./pages/manutentores";

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home/>}/>
            <Route path="/ambientes" element={< Ambientes/>}/>
            <Route path="/patrimonios" element={< Patrimonios/>}/>
            <Route path="/manutentores" element={< Manutentores/>}/>
            </Routes>
        </Router>
    )
}

export default App;