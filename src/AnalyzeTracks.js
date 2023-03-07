import React from "react";
import { Link } from "react-router-dom";

function AnalyzeTracks() {
  return (
    <div>
      <h1>here's the stats:</h1>
      <div class="card text-dark">
        <h4 class="card-title">stats here </h4>
      </div>
      <br></br>
      <Link to="dashboard">
        <button type="button" class="btn btn-outline-secondary btn-lg">
          learn more...
        </button>
      </Link>
    </div>
  );
}

export default AnalyzeTracks;
