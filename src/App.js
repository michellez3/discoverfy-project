import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Home from "./Home";
import AnalyzeTracks from "./AnalyzeTracks";
import Dashboard from "./Dashboard";

function App() {
  // VARIABLES FOR AUTHENTICATION WITH SPOTIFY ACCOUNT:
  const CLIENT_ID = "b9c0b9aee602418f98b74021553b0180";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "user-top-read";
  const [token, setToken] = useState("");

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
            <button type="button" className="btn btn-outline-secondary">
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
            >
              Login to Spotify
            </a>
          ) : (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>

        <h1 style={{ fontSize: 100, color: "#D8F8FF" }}>discoverfy </h1>
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route path="/analyzeTracks" element={<AnalyzeTracks />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
