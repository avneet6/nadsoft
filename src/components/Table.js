import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MembersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('https://crudcrud.com/api/d009b9d205ea40e49c2867f6cbd51033/members')
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching data!', error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = members.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://crudcrud.com/api/d009b9d205ea40e49c2867f6cbd51033/members/${id}`)
          .then(response => {
            setMembers(members.filter(member => member._id !== id));
            toast.success('Record has been deleted successfully!');
          })
          .catch(error => {
            toast.error('There was an error deleting the record.');
          });
      }
    });
  };

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((member) => (
            <tr key={member._id}>
              <td>{member._id}</td>
              <td> 
                <Link to={`/edit-member/${member._id}`}>
                {member.name}
                </Link> 
                </td>
                 <td>
                     <Link to={`/edit-member/${member._id}`}>{member.email}</Link>
                      </td>
              <td>{member.age}</td>
              <td>
                <button onClick={() => handleDelete(member._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button onClick={() => handlePageChange(1)}>First</button>
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        <button onClick={() => handlePageChange(Math.ceil(members.length / itemsPerPage))}>Last</button>
      </div>
    </div>
  );
};

export default MembersTable;

