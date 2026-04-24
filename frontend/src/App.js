import React, { useState } from 'react';

function App() {
  const [taskType, setTaskType] = useState("Medical");
  const [requests, setRequests] = useState("");
  const [urgency, setUrgency] = useState("");
  const [available, setAvailable] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [shortage, setShortage] = useState(null);

  const handlePredict = () => {
    const predicted = 23; // fake prediction
    setPrediction(predicted);
    setShortage(predicted - available);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Volunteer Demand Predictor</h1>

      <div>
        <label>Task Type:</label><br />
        <select value={taskType} onChange={(e) => setTaskType(e.target.value)}>
          <option value="Medical">Medical</option>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
          <option value="Shelter">Shelter</option>
        </select>
      </div>

      <br />

      <div>
        <label>Requests:</label><br />
        <input
          type="number"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Urgency (1-5):</label><br />
        <input
          type="number"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label>Available Volunteers:</label><br />
        <input
          type="number"
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
        />
      </div>

      <br />

      <button onClick={handlePredict}>Predict</button>

      {prediction && (
        <div style={{ marginTop: "30px" }}>
          <h2>Prediction Result</h2>
          <p><strong>Predicted Volunteers Needed:</strong> {prediction}</p>
          <p><strong>Additional Volunteers Required:</strong> {shortage}</p>
        </div>
      )}
    </div>
  );
}

export default App;