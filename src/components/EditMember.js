import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditMember.css'; // Ensure to add this CSS file

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch user information based on ID
    axios.get(`https://crudcrud.com/api/d009b9d205ea40e49c2867f6cbd51033/members/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let inputErrors = {};
    if (!formData.name) inputErrors.name = 'Name is required';
    if (!formData.email) inputErrors.email = 'Email is required';
    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Update user information
    axios.put(`https://crudcrud.com/api/d009b9d205ea40e49c2867f6cbd51033/members/${id}`, formData)
      .then(response => {
        toast.success('Member information updated successfully!');
        navigate('/'); // Navigate back to the List member page
      })
      .catch(error => {
        toast.error('There was an error updating the information.');
      });
  };

  return (
    <div className="edit-container">
      <div className="form-header">
        <h3>Edit Member</h3>
        <button className="close-button" onClick={() => navigate('/')}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="aWrt">
          <label>Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={!!errors.name ? 'is-invalid' : ''}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="aWrt">
          <label>Email <span style={{ color: 'red' }}>*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={!!errors.email ? 'is-invalid' : ''}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="aWrt">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <button className="aWrt" type="submit">Save</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditMember;
