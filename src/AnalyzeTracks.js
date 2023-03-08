import React from "react";
import { Outlet, Link } from "react-router-dom";

function AnalyzeTracks(props) {
  return (
    <div>
      <h1>here's the stats:</h1>
      <div className="card text-dark">
        <h4 className="card-title">stats here </h4>
      </div>
      <br></br>
      <Link to="/dashboard">
        <button type="button" className="btn btn-outline-secondary btn-lg">
          learn more...
        </button>
      </Link>
      <Outlet />
    </div>
  );
}

export default AnalyzeTracks;
