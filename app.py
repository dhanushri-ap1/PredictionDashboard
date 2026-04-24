from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    task_type = data['task_type']
    requests_count = data['requests']
    urgency = data['urgency']
    available = data['available']

    # Prepare input
    input_data = pd.DataFrame([{
        'requests': requests_count,
        'urgency': urgency,
        'task_type': task_type
    }])

    input_data = pd.get_dummies(input_data)
    input_data = input_data.reindex(columns=model_columns, fill_value=0)

    # Predict volunteers needed
    prediction = round(model.predict(input_data)[0])

    # Calculate shortage
    shortage = max(0, prediction - available)

    # Severity classification
    if urgency >= 4 and shortage >= 10:
        severity = "Critical"
    elif urgency >= 3 and shortage >= 5:
        severity = "High"
    else:
        severity = "Moderate"

    # Impact estimation
    impact = shortage * 5

    # Recommendation engine
    if severity == "Critical":
        recommendation = "Immediately reallocate volunteers and recruit emergency responders"
    elif severity == "High":
        recommendation = "Reallocate volunteers from lower priority tasks"
    else:
        recommendation = "Current resource allocation is manageable"

    return jsonify({
        "predicted_volunteers": prediction,
        "shortage": shortage,
        "severity": severity,
        "impact": impact,
        "recommendation": recommendation
    })

if __name__ == '__main__':
    app.run(debug=True)