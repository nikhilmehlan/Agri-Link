import './PredictionBox.css'
import React from 'react';

const PredictionBox = ({healthyPercent, rustPercent, powderyPercent}) => {
    return (
        <div className='prediction-box'>
          <div className="overlap">
            <div className="heading">Predictions</div>
            <div className="stats">
              <div className="text-wrapper">Healthy: {(healthyPercent*100).toFixed(2)}</div>
              <div className="text-wrapper">Crop Rust: {(rustPercent*100).toFixed(2)}</div>
              <div className="text-wrapper">Powdery: {(powderyPercent*100).toFixed(2)}</div>
            </div>
          </div>
        </div>
    )
}

export default PredictionBox;