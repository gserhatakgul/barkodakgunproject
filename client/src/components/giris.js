import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="bg-primary d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center text-white">
        <h1 className="display-4"> Barkod Sorgulama</h1>
        <hr className="my-4" />
        <div className="d-flex justify-content-center">
          <Link to="/login" className="btn btn-light btn-lg mr-3">
            GİRİŞ
          </Link>
          <Link to="/register" className="btn btn-dark btn-lg">
            KAYIT OL
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
