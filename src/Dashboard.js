import React from "react";

function Dashboard() {
  return (
    <div>
      <h4>learn more about your music taste</h4>
      <div className="container">
        <div className="row row-padding">
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              top artists
            </button>
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              top albums
            </button>
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              top podcasts
            </button>
          </div>
        </div>
        <div className="row row-padding">
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              top audiobooks
            </button>
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              recommendations
            </button>
          </div>
          <div className="col-sm-4">
            <button type="button" className="btn btn-outline-secondary btn-lg">
              find local artists
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
