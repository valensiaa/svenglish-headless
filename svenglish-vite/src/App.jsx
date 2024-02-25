import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import SocIcons from "./layouts/SocIcons";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="App flex flex-col font-sans font-normal">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="en/products/:productSlug" element={<ProductDetails />} />
        <Route path="/produits/:productSlug" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
      <SocIcons />
    </div>
  );
}

export default App;
