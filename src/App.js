import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Home from "./Home";
import AnalyzeTracks from "./AnalyzeTracks";
import Dashboard from "./Dashboard";
require("dotenv").config();

function App() {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

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
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
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
          <Route
            path="/analyzeTracks"
            element={<AnalyzeTracks token={token} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
