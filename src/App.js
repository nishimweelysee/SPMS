import React from 'react';
import Dashboard from './pages/dashboard';
import Events from './pages/dashboard/events';
import Artists from './pages/dashboard/artists';
import Contracts from './pages/dashboard/contracts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/ui/Login';
import { UserRoute } from './helpers/Constants';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={UserRoute.login} element={<Login />} />
        <Route path={UserRoute.dashborad} element={<Dashboard />} />
        <Route path={UserRoute.events} element={<Events />} />
        <Route path={UserRoute.artists} element={<Artists />} />
        <Route path={UserRoute.contacts} element={<Contracts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
