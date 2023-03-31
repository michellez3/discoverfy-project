import React from "react";
import { Link } from "react-router-dom";
import { artistSelector } from "./selectors/Selector";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Dashboard({ token, artists, setArtists }) {
  // FETCH TOP ARTISTS + NAVIGATE:
  const navigate = useNavigate();

  const fetchArtists = async (e) => {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          limit: 10,
          time_range: "long_term",
        },
      }
    );
    const artistData = artistSelector(data);
    setArtists(artistData);
    console.log(artistData);
    console.log(token);
    console.log("here");
    navigate("/topArtists");
  };

  return (
    //DASHBOARD:
    <div>
      <h2>learn more about your music taste</h2>
      <div className="container">
        <div className="row row-padding">
          <div className="col-sm-4">
            <Link to="/topArtists">
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg"
                style={{ width: "100%" }}
                onClick={fetchArtists}
              >
                top artists
              </button>
            </Link>
          </div>
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              top albums
            </button>
          </div>
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              top podcasts
            </button>
          </div>
        </div>
        <div className="row row-padding">
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              top audiobooks
            </button>
          </div>
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              recommendations
            </button>
          </div>
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              find local artists
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  token: PropTypes.string,
  artists: PropTypes.array,
  setArtists: PropTypes.func,
};

export default Dashboard;
