import { Link } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const searchTracks = async (e) => {
    console.log(props.token);
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        // params: {
        //   type: "tracks",
        // },
      }
    );
    console.log(data);
  };
  return (
    <div>
      <Link to="analyzeTracks">
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg"
          onClick={searchTracks}
        >
          Analyze Tracks
        </button>
      </Link>
    </div>
  );
}

export default Home;
