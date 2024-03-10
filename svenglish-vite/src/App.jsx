import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import SocIcons from "./layouts/SocIcons";
import ProductDetails from "./pages/ProductDetails";
import TopUp from "./layouts/TopUp";

function App() {
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App flex flex-col font-sans font-normal">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/en" element={<Home />} />
        <Route path="/en/products/:productSlug" element={<ProductDetails />} />
        <Route path="/produits/:productSlug" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer activeSocIcons={isBottom} />
      {isBottom == false && <SocIcons />}
      {<TopUp />}
    </div>
  );
}

export default App;
