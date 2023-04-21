import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

function AudioFeatures({
  features,
  setFeatures,
  searchTerm,
  setSearchTerm,
  token,
}) {
  const [resultClicked, setResultClicked] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  //SEARCH FOR SONGS
  const searchTracks = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchTerm,
        type: "track",
      },
    });

    setSearchResults(data.tracks.items);
    console.log("searchResults", searchResults);
    setResultClicked(false);
  };

  //CLICK A SONG
  const handleResultClick = async (id) => {
    console.log("Clicked on result with id", id);
    setResultClicked(true);

    //AUDIO FEATURES
    const getFeatures = async (id) => {
      const { data: audioData } = await axios.get(
        `https://api.spotify.com/v1/audio-features/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeatures(audioData);
      return audioData;
    };
    const audioResponse = await getFeatures(id);
    console.log("audioResponse", audioResponse);
  };

  return (
    <div>
      {/* SEARCH BAR */}
      <form onSubmit={searchTracks} style={{ margin: "20px" }}>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="enter song name"
          style={{ fontFamily: "Poppins, sans-serif" }}
        />
        <button type={"submit"} style={{ fontFamily: "Poppins, sans-serif" }}>
          {" "}
          Search
        </button>
      </form>
      {/* RESULTS */}
      {resultClicked ? (
        <div className="list" style={{ margin: "10px" }}>
          <ol>
            <li>
              <span>{features.danceability}</span>
              <h2>DANCEABILITY</h2>
              <p>
                Danceability describes how suitable a track is for dancing based
                on a combination of musical elements including tempo, rhythm
                stability, beat strength, and overall regularity. A value of 0.0
                is least danceable and 1.0 is most danceable.
              </p>
            </li>

            <li>
              <span>{features.energy}</span>
              <h2>ENERGY</h2>
              <p>
                Energy is a measure from 0.0 to 1.0 and represents a perceptual
                measure of intensity and activity. Typically, energetic tracks
                feel fast, loud, and noisy. For example, death metal has high
                energy, while a Bach prelude scores low on the scale. Perceptual
                features contributing to this attribute include dynamic range,
                perceived loudness, timbre, onset rate, and general entropy.
              </p>
            </li>

            <li>
              <span>{features.loudness}</span>
              <h2>LOUDNESS</h2>
              <p>
                The overall loudness of a track in decibels (dB). Loudness
                values are averaged across the entire track and are useful for
                comparing relative loudness of tracks. Loudness is the quality
                of a sound that is the primary psychological correlate of
                physical strength (amplitude). Values typically range between
                -60 and 0 db.
              </p>
            </li>

            <li>
              <span>{features.instrumentalness}</span>
              <h2>INSTRUMENTALNESS</h2>
              <p>
                Predicts whether a track contains no vocals. "Ooh" and "aah"
                sounds are treated as instrumental in this context. Rap or
                spoken word tracks are clearly "vocal". The closer the
                instrumentalness value is to 1.0, the greater likelihood the
                track contains no vocal content. Values above 0.5 are intended
                to represent instrumental tracks, but confidence is higher as
                the value approaches 1.0.
              </p>
            </li>

            <li>
              <span>{features.speechiness}</span>
              <h2>SPEECHINESS</h2>
              <p>
                Speechiness detects the presence of spoken words in a track. The
                more exclusively speech-like the recording (e.g. talk show,
                audio book, poetry), the closer to 1.0 the attribute value.
                Values above 0.66 describe tracks that are probably made
                entirely of spoken words. Values between 0.33 and 0.66 describe
                tracks that may contain both music and speech, either in
                sections or layered, including such cases as rap music. Values
                below 0.33 most likely represent music and other non-speech-like
                tracks.
              </p>
            </li>

            <li>
              <span>{features.valence}</span>
              <h2>VALENCE</h2>
              <p>
                A measure from 0.0 to 1.0 describing the musical positiveness
                conveyed by a track. Tracks with high valence sound more
                positive (e.g. happy, cheerful, euphoric), while tracks with low
                valence sound more negative (e.g. sad, depressed, angry).
              </p>
            </li>
          </ol>
        </div>
      ) : (
        searchResults.length > 0 && (
          <div style={{ margin: "20px" }}>
            <h3>CLICK TO SELECT ONE SONG:</h3>
            {searchResults.map((track) => (
              <h3
                key={track.id}
                onClick={() => handleResultClick(track.id)}
                style={{ color: "gray" }}
              >
                {track.name} by {track.artists[0].name}
              </h3>
            ))}
          </div>
        )
      )}
      {/* DASHBOARD BUTTON */}
      <Link to="/dashboard">
        <button
          type="button"
          className="btn btn-outline-secondary btn-lg"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          return to dashboard
        </button>
      </Link>
    </div>
  );
}

AudioFeatures.propTypes = {
  features: PropTypes.array,
  setFeatures: PropTypes.func,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};
export default AudioFeatures;
