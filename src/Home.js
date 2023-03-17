import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { useState } from "react";

function Home(props) {
  // FETCH DATA (TOP TRACKS) + NAVIGATE TO ANALYZETRACKS:
  //const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  const fetchTracks = async (e) => {
    console.log(props.token);
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          limit: 10,
        },
      }
    );
    console.log(data.items);
    //setTracks(data.items);
    navigate("/analyzeTracks", { state: data.items });
  };

  // //BUTTON CLICK ACTIONS:
  // const navigate = useNavigate(); //necessary because of the component change during the button click

  // const buttonClick = async () => {
  //   await fetchTracks();
  //   navigate.push("/analyzeTracks");
  // };

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-secondary btn-lg"
        onClick={fetchTracks}
      >
        analyze tracks
      </button>
    </div>
  );
}

export default Home;
