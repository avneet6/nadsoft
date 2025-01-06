import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddNewMember.css';

const AddNewMember = () => {
  const [member, setMember] = useState({
    name: '',
    email: '',
    age: '',
    parent_id: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const validate = () => {
    let inputErrors = {};
    if (!member.name) inputErrors.name = 'Name is required';
    if (!member.email) inputErrors.email = 'Email is required';
    setErrors(inputErrors);
    return Object.keys(inputErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post('https://crudcrud.com/api/d009b9d205ea40e49c2867f6cbd51033/members', member);
      toast.success('Member added successfully!');
      console.log(response.data);
      setMember({ name: '', email: '', age: '', parent_id: '' });
    } catch (error) {
      toast.error('There was an error adding the member.');
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="add-member-container">
      <div className="form-header">
        <h3 className="sWrtf">Add New Member</h3>
        <button className="close-button" onClick={() => navigate('/')}>×</button>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="form-group">
          <Form.Group controlId="formMemberName">
            <Form.Label>Member Name <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={member.name}
              onChange={handleChange}
              placeholder="Enter member name"
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="form-group">
          <Form.Group controlId="formMemberEmail">
            <Form.Label>Member Email <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={member.email}
              onChange={handleChange}
              placeholder="Enter member email"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="form-group">
          <Form.Group controlId="formMemberAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={member.age}
              onChange={handleChange}
              placeholder="Enter member age"
            />
          </Form.Group>
        </div>
        <div className="form-group">
          <Form.Group controlId="formParentId">
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="text"
              name="parent_id"
              value={member.parent_id}
              onChange={handleChange}
              placeholder="Enter parent ID"
            />
          </Form.Group>
        </div>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddNewMember;
