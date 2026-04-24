import pandas as pd
import numpy as np
import random
import joblib
from sklearn.ensemble import RandomForestRegressor

np.random.seed(42)

task_types = ['Food', 'Medical', 'Education', 'Shelter']
data = []

for _ in range(1000):
    task_type = random.choice(task_types)
    requests = np.random.randint(5, 50)
    urgency = np.random.randint(1, 6)

    task_weight = {
        'Food': 1.0,
        'Medical': 1.5,
        'Education': 0.8,
        'Shelter': 1.2
    }

    volunteers_needed = (
        requests * 0.5 +
        urgency * 2 +
        task_weight[task_type] * 3
    )

    volunteers_needed += np.random.normal(0, 2)
    volunteers_needed = round(max(1, volunteers_needed))

    data.append([task_type, requests, urgency, volunteers_needed])

df = pd.DataFrame(data, columns=[
    'task_type',
    'requests',
    'urgency',
    'volunteers_needed'
])

df = pd.get_dummies(df, columns=['task_type'])

X = df.drop('volunteers_needed', axis=1)
y = df['volunteers_needed']

model = RandomForestRegressor()
model.fit(X, y)

joblib.dump(model, 'model.pkl')
joblib.dump(X.columns.tolist(), 'model_columns.pkl')

print("Model trained and saved successfully!")