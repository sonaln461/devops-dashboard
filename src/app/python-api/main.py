from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Literal
import random

app = FastAPI()

class DeploymentData(BaseModel):
    project: str
    environment: Literal["staging", "production"]
    version: str
    #time_of_day: Literal["morning", "afternoon", "evening", "night"]
    #prev_failure_rate: float

@app.post("/predict-risk")
def predict_risk(data: DeploymentData):
    try:
        # Simple simulated risk model logic (replace with real ML later)
        base_risk = 0.2
        env_modifier = 0.2 if data.environment == "production" else 0.0
        # time_modifier = {
        #     "morning": 0.05,
        #     "afternoon": 0.1,
        #     "evening": 0.15,
        #     "night": 0.25,
        # }[data.time_of_day]

        risk = base_risk + env_modifier #time_modifier + data.prev_failure_rate
        noise = random.uniform(-0.05, 0.05)  # add random noise
        final_score = min(max(risk + noise, 0), 1)  # clamp between 0 and 1

        return {"risk_score": round(final_score, 2)}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))