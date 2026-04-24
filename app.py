from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")
model_columns = joblib.load("model_columns.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json

    task_type = data['task_type']
    requests_count = data['requests']
    urgency = data['urgency']

    input_data = pd.DataFrame(columns=model_columns)
    input_data.loc[0] = 0

    input_data.at[0, 'requests'] = requests_count
    input_data.at[0, 'urgency'] = urgency

    task_column = f'task_type_{task_type}'
    if task_column in input_data.columns:
        input_data.at[0, task_column] = 1

    prediction = model.predict(input_data)[0]

    return jsonify({
        "predicted_volunteers": round(prediction)
    })

if __name__ == '__main__':
    app.run(debug=True)