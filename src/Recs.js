import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import axios from "axios";

function Recs({ recs, setRecs, token }) {
  let userId = "";
  //GET USER ID
  fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      userId = data.id;
      console.log(userId);
    });

  // // CREATE PLAYLIST
  // const createPlaylist = async (e) => {
  //   const { data } = await axios.post(
  //     `https://api.spotify.com/v1/users/${userId}/playlists`,
  //     {
  //       name: "song recs!",
  //       description: "from discoverfy.",
  //       public: false,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log("here");
  //   getPlaylist();
  //   addSongs();
  // };

  // //ADD SONGS TO PLAYLIST
  // const addSongs = async (e) => {
  //   const { data } = await axios.post(
  //     `https://api.spotify.com/v1/playlists/${playlistId}/tracks``,
  //     {
  //       name: "song recs!",
  //       description: "from discoverfy.",
  //       public: false,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log("here");
  // };

  return (
    <div>
      <h2>song recs:</h2>
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
          {recs.map((data, index) => {
            const { songName, image, url } = data;
            return (
              <div rowIndex={index} key={songName}>
                <img
                  style={{ width: "15%", height: "15%", objectFit: "cover" }}
                  src={image}
                  alt="artist"
                />
                <a
                  href={url}
                  className="recLink d-inline-block"
                  target="_blank"
                >
                  #{index + 1} - {songName}
                </a>
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
          style={{ fontFamily: "Poppins, sans-serif", marginRight: "20px" }}
        >
          return to dashboard
        </button>
      </Link>

      {/* <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        style={{ fontFamily: "Poppins, sans-serif" }}
        onClick={() => createPlaylist()}
      >
        create playlist
      </button> */}
    </div>
  );
}

Recs.propTypes = {
  recs: PropTypes.array,
  setRecs: PropTypes.func,
};
export default Recs;
