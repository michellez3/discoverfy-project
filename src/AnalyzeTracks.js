import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function AnalyzeTracks({ tracks, setTracks }) {
  return (
    <div>
      <h2>top tracks:</h2>
      <div className="card" style={{ borderRadius: 0 }}>
        <h5 style={{ padding: "12px", textAlign: "left" }}>
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
      <center>
        <Link to="/dashboard">
          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            more features
          </button>
        </Link>
      </center>
    </div>
  );
}

AnalyzeTracks.propTypes = {
  tracks: PropTypes.array,
  setTracks: PropTypes.func,
};
export default AnalyzeTracks;
