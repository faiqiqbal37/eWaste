import React, { useState } from 'react';
import './sdashboard.css';
import StaffNavbar from "../../components/staffNavbar";

const Sdashboard = () => {
    return (
        <div className="row">
            <StaffNavbar/>
            <br/>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon"><i className="fas fa-heartbeat"></i></div>
                <h4 className="title"><a href="#">User Management</a></h4>
            </div>
            <br/>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
                <div className="icon"><i className="fas fa-pills"></i></div>
                <h4 className="title"><a href="#">Device Management</a></h4>
            </div>
            <br/>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
                <div className="icon"><i className="fas fa-hospital-user"></i></div>
                <h4 className="title"><a href="#">QR Code Management</a></h4>
            </div>
            <br/>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon"><i className="fas fa-dna"></i></div>
                <h4 className="title"><a href="#">Payment Management</a></h4>
            </div>
        </div>
    );
}
export default Sdashboard;