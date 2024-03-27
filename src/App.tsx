// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/"  element={<Home/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
        </Routes>
    </Router>
  );
};

export default App;
