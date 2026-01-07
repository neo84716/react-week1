import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />       {/* 首頁登入 */}
        <Route path="/Products" element={<Products />} /> {/* 登入後切到產品分頁 */}
      </Routes>
  );
}

export default App;
