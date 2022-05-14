import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DoctorDashboard from './Components/DoctorDashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/doctor" element={<DoctorDashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
