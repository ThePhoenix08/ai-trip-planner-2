import { Routes, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/pages/Home';
import Planner from './components/pages/Planner';
import Trips from './components/pages/Trips';
import AppWrapper from './components/AppWrapper';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './components/pages/NotFound';
import Trip from './components/pages/Trip';

function App() {
  return (
    <div className="App">
      <AppWrapper>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/app" element={<ProtectedRoutes />}>
            <Route path="planner" element={<Planner />} />
            <Route path="trips" element={<Trips />} />
            <Route path="trips/:tripId" element={<Trip />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppWrapper>
    </div>
  );
}

export default App;
