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
          {tracks.map((data, index) => {
            const { songName, artistName, albumCover } = data;
            return (
              <div rowIndex={index} key={songName}>
                #{index + 1} - {songName}, {artistName}
                <img src={albumCover} alt="album cover" />
                <br></br>
                <br></br>
                <br></br>{" "}
              </div>
            );
          })}
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
