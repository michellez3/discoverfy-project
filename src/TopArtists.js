import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function TopArtists({ artists, setArtists }) {
  return (
    <div>
      <h2>top artists:</h2>
      <div
        class="card"
        style={{
          borderRadius: 0,
          background: "linear-gradient(135deg, #f2f2f2 0%,#b9def4 100%)",
        }}
      >
        <h5
          className="card-text font-size: 12px"
          style={{
            color: "black",
            padding: "12px",
            textAlign: "left",
          }}
        >
          {artists.map((data, index) => {
            const { artistName, image } = data;
            return (
              <div rowIndex={index} key={artistName}>
                <img
                  style={{ width: "19%", height: "19%" }}
                  src={image}
                  alt="artist"
                />
                #{index + 1} - {artistName}
                <br></br>
                <br></br>
                <br></br>{" "}
              </div>
            );
          })}
        </h5>
      </div>
      <Link to="/dashboard">
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          return to dashboard
        </button>
      </Link>
      <br></br>
      <br></br>
    </div>
  );
}

TopArtists.propTypes = {
  artists: PropTypes.array,
  setArtists: PropTypes.func,
};
export default TopArtists;
