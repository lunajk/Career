import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CareerExplorer from "./pages/career";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<CareerExplorer />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
