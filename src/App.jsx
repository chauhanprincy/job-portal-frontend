import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyApplications from "./pages/MyApplications";
import CreateJob from './pages/CreateJob';
import EmployerJobs from './pages/EmployerJobs';

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

     
      {token && <Navbar />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/employer-jobs" element={<EmployerJobs />} />
        <Route path='/Home' element={<Home />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
