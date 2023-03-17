import React from "react";
import { Outlet, Link } from "react-router-dom";

function AnalyzeTracks(props) {
  return (
    <div>
      <h1>top tracks:</h1>
      <div className="card text-dark">
        <h5 className="card-text font-size: 12px">
          song #1 <br></br> song #2 <br></br> song #3<br></br>
          song #4 <br></br>song #5
        </h5>
      </div>
      <br></br>
      <Link to="/dashboard">
        <button type="button" className="btn btn-outline-secondary btn-lg">
          click for more features
        </button>
      </Link>
      <Outlet />
    </div>
  );
}

export default AnalyzeTracks;
