import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="analyzeTracks">
        <button type="button" class="btn btn-outline-secondary btn-lg">
          Analyze Tracks
        </button>
      </Link>
    </div>
  );
}

export default Home;
