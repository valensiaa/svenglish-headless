import { Routes, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import SocIcons from "./layouts/SocIcons";

import "./App.css";

function App() {
  return (
    <div className="App flex flex-col font-sans font-normal">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
      </Routes>
      <Footer />
      <SocIcons />
    </div>
  );
}

export default App;
