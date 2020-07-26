import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">DeployMaster</Link>
      </h1>
      <ul>
        <li>
          <Link to="/create">Create Deployment</Link>
        </li>
        <li>
          <Link to="/view">View Deployments</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
