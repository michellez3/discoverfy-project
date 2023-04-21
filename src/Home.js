import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { songSelector } from "./selectors/Selector";
import { artistSelector } from "./selectors/Selector";

function Home({ token, tracks, setTracks, artists, setArtists }) {
  // FETCH DATA (TOP TRACKS)
  const navigate = useNavigate();

  const fetchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
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
    const songData = songSelector(data);
    setTracks(songData);

    // FETCH DATA (TOP ARTISTS)
    const { data: artistResponse } = await axios.get(
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
    const artistData = artistSelector(artistResponse);
    setArtists(artistData);

    //NAVIGATE TO ANALYZETRACKS:
    navigate("/analyzeTracks");
  };

  return (
    <div>
      <button
        type="button"
        className="button-86"
        role="button"
        onClick={fetchTracks}
      >
        top tracks
      </button>
    </div>
  );
}

Home.propTypes = {
  token: PropTypes.string,
  tracks: PropTypes.array,
  setTracks: PropTypes.func,
  artists: PropTypes.array,
  setArtists: PropTypes.func,
};

export default Home;
