import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    content: "",
    position: { top: 10, left: 10 },
    size: { width: 20, height: 10 },
  });

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      await fetch("/overlays", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      })
        .then((response) =>
          response
            .json()
            .then((data) => console.log("overlays : ", data.overlays))
        )
        .catch((error) => console.log("error : ", error));

      console.log("inside");
    } catch (error) {
      console.log("Error fetching overlays!");
    }
  };

  const addOverlay = async () => {
    try {
      const response = await fetch("/overlays", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newOverlay),
      });
      await response.json();
      fetchOverlays();
    } catch (error) {
      console.error("Error adding overlay:", error);
    }
  };

  const updateOverlay = async (id) => {
    try {
      const response = await fetch(`/overlays/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOverlay),
      });
      await response.json();
      fetchOverlays();
    } catch (error) {
      console.error("Error updating overlay:", error);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      const response = await fetch(`/overlays/${id}`, {
        method: "DELETE",
      });
      await response.json();
      fetchOverlays();
    } catch (error) {
      console.error("Error deleting overlay:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="video-container">
        <div>
          <iframe
            width="640"
            height="480"
            src="https://rtsp.me/embed/ZtTbt9at/"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="overlay-container">
        {console.log("overlays : ", overlays)}
        {overlays.map((overlay) => (
          <div
            key={overlay._id}
            className="overlay"
            style={{
              top: `${overlay.position.top}`,
              left: `${overlay.position.left}`,
              width: `${overlay.position.width}`,
              height: `${overlay.position.height}`,
            }}
          >
            {overlay.content}
          </div>
        ))}
      </div>
      <div className="controls-container">
        <button onClick={() => fetchOverlays()}>Fetch Overlay</button>
        <button onClick={() => addOverlay()}>Add Overlay</button>
        <button onClick={() => updateOverlay()}>Update Overlay</button>
        <button onClick={() => deleteOverlay()}>Delete Overlay</button>
      </div>
    </div>
  );
}

export default App;
