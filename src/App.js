import React from 'react';
import Dashboard from './pages/dashboard';
import Events from './pages/dashboard/events';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/events' element={<Events />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
