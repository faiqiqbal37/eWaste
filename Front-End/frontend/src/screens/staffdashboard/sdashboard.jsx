import React, { useState } from 'react';
import './sdashboard.css';
import Navbar from "../../components/navbar";
import {Link} from "react-router-dom";
import StaffNavbar from "../../components/staffNavbar";

const Sdashboard = () => {
  return (
      <div>
          <StaffNavbar />
          <section id="about" className="section">
              <br/>
              <h2><strong>User Management</strong>  </h2>
              <h2> Device Management</h2>
              <h2> QR Code Management</h2>
              <h2> Payment Management</h2>
          </section>
      </div>
  );
}
export default Sdashboard;