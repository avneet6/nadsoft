import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewMember from './components/AddNewMember';
import Table from './components/Table';
import EditMember from './components/EditMember';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <div>
    
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<div><Navbar/><Table /></div>} />
          <Route path="/add-new-member" element={<AddNewMember />} />
          <Route path="/edit-member/:id" element={<EditMember />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
    </div>
  );
};

export default App;
