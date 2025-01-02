import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PhotoDetailPage from "./pages/PhotoDetailPage";



const App: React.FC = () => {
  const handleClick = () => {
    alert('버튼이 클릭되었습니다!')
  }


    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* /photo-detail → PhotoDetailPage */}
        <Route path="/photo-detail" element={<PhotoDetailPage />} />
      </Routes>
    </BrowserRouter>
    );

}

export default App
