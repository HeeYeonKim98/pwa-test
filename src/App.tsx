import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "./About";
import Home from "./Home";
import React from "react";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);

export default App;
