import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

import base64
from io import BytesIO
from PIL import Image
import numpy as np
import logging
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

# Suppress TensorFlow warnings
logging.getLogger('tensorflow').setLevel(logging.ERROR)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify origins here or leave it as "*" to allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model('model.h5')
labels = {0: 'Healthy', 1: 'Powdery', 2: 'Rust'}

def getResult(img):
    x = img_to_array(img)
    x = x.astype('float32') / 255.
    x = np.expand_dims(x, axis=0)
    predictions = model.predict(x)[0]
    return predictions

@app.post('/model/train')
async def process(data: dict):
    if 'data' not in data:
        raise HTTPException(status_code=400, detail="Missing 'data' key in the request JSON")

    image_data = data['data']

    # Decode base64 image data
    image_bytes = base64.b64decode(image_data)

    # Open the image
    with BytesIO(image_bytes) as buffer:
        img = Image.open(buffer)
        img = img.resize((225, 225))

    # Get predictions
    predictions = getResult(img)
    predictions_list = predictions.tolist()

    # Prepare response
    response_data = {"percentage": predictions_list, "labels": list(labels.values())}

    print(response_data)
    return JSONResponse(content=response_data)