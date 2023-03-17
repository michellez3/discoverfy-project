import React from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from "prop-types";

function AnalyzeTracks({ tracks, setTracks }) {
  console.log(tracks);
  return (
    <div>
      <h1>top tracks:</h1>
      <div className="card text-dark">
        <h5
          className="card-text font-size: 12px"
          style={{ padding: "12px", textAlign: "left" }}
        >
          #1 - {tracks[0].name}
          <br></br> #2 - {tracks[1].name} <br></br> #3 - {tracks[2].name}
          <br></br>
          #4 - {tracks[3].name} <br></br>#5 - {tracks[4].name}
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

AnalyzeTracks.propTypes = {
  tracks: PropTypes.array,
  setTracks: PropTypes.func,
};
export default AnalyzeTracks;
