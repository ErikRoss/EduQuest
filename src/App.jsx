import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Inventory from './pages/Inventory';
import ParentPortal from './pages/ParentPortal';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/parent-portal" element={<ParentPortal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
