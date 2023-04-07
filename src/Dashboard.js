import React from "react";
import { Link } from "react-router-dom";
import { artistSelector } from "./selectors/Selector";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Dashboard({ token, artists, setArtists, tracks, setTracks }) {
  // FETCH TOP ARTISTS + NAVIGATE:
  const navigate = useNavigate();

  const fetchArtists = async (e) => {
    e.preventDefault();
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
    navigate("/topArtists");
  };

  // FETCH RECS + NAVIGATE:
  const fetchRecs = async (e) => {
    const ArtistIds = [];
    const Genres = [];
    console.log("ARTISTS DATA", artists);
    artists.map((data, index) => {
      const { artistId, genre } = data;
      ArtistIds.push(artistId);
      Genres.push(genre);
      return ArtistIds;
    });
    ArtistIds.splice(5, 5);
    Genres.splice(5, 5);

    const SongIds = [];
    tracks.map((data, index) => {
      const { songId } = data;
      SongIds.push(songId);
      return SongIds;
    });
    SongIds.splice(5, 5);

    console.log("ARTISTS", ArtistIds);
    console.log("TRACKS", SongIds);
    console.log("GENRES", Genres);

    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/recommendations",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          seed_artists: ArtistIds[0],
          seed_genres: Genres[0],
          seed_tracks: SongIds[0],
        },
      }
    );

    navigate("/recs");
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
              onClick={fetchRecs}
            >
              song recs
            </button>
          </div>
          <div className="col-sm-4">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ width: "100%" }}
            >
              song analysis
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
              top podcasts
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
  tracks: PropTypes.array,
  setTracks: PropTypes.func,
};

export default Dashboard;
