import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import AnalyzeTracks from "./AnalyzeTracks";
import Dashboard from "./Dashboard";
import TopArtists from "./TopArtists";
import Recs from "./Recs";
import AudioFeatures from "./AudioFeatures";

function App() {
  // VARIABLES FOR AUTHENTICATION WITH SPOTIFY ACCOUNT:
  const CLIENT_ID = "b9c0b9aee602418f98b74021553b0180";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read playlist-modify-public playlist-modify-private";
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recs, setRecs] = useState([]);
  const [features, setFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // SET TOKEN FROM HASH:
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // LOGOUT FUNCTION:
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="topLeftcorner">
          <Link to="/">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              home
            </button>
          </Link>
        </div>
        <div className="topcorner">
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
              className="btn btn-outline-secondary"
              role="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              login to spotify
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              style={{ fontFamily: "Poppins, sans-serif" }}
              onClick={logout}
            >
              logout
            </button>
          )}
        </div>
        <br></br>

        <h1
          style={{
            fontSize: 100,
            color: "#D8F8FF",
            marginTop: "20px !important",
          }}
        >
          discoverfy{" "}
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                token={token}
                tracks={tracks}
                setTracks={setTracks}
                artists={artists}
                setArtists={setArtists}
              />
            }
          />
          <Route
            path="/analyzeTracks"
            element={<AnalyzeTracks tracks={tracks} setTracks={setTracks} />}
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                token={token}
                artists={artists}
                setArtists={setArtists}
                tracks={tracks}
                setTracks={setTracks}
                recs={recs}
                setRecs={setRecs}
              />
            }
          />
          <Route
            path="/topArtists"
            element={<TopArtists artists={artists} setArtists={setArtists} />}
          />
          <Route
            path="/recs"
            element={<Recs recs={recs} setRecs={setRecs} token={token} />}
          />
          <Route
            path="audioFeatures"
            element={
              <AudioFeatures
                features={features}
                setFeatures={setFeatures}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                token={token}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
