import React from 'react';
import { Link } from 'react-router-dom';
import './Table';

function Navbar() {
  return (
    <div>
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">All Members</a>
        </div>
      </nav>

      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">

          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="QA" aria-label="Search" />
          </form>
          <Link to="/add-new-member">
            <button type="button" class="btn btn-success">Add New Member</button>
          </Link>
        </div>
      </nav>
    </div>

  )
}

export default Navbar;
