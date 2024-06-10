import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { assets } from '../../assets/assets';
import UploadedFile from '../../components/UploadedFile/UploadedFile';
import PredictionBox from '../../components/PredictionBox/PredictionBox';
import './Scan.css'

const Scan = () => {
  const [files, setFiles] = useState([]);
  const [prediction, setPrediction] = useState([]);
  
  const getPrediction = () => {
    setPrediction([]);
    files.map(async (file) => {
      fetch(`http://127.0.0.1:8000/model/train`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: file[0].base64Data})
      })
      .then(response => response.json())
      .then((result) => {
        setPrediction((prevPredictions) => [
          ...prevPredictions,
          result.percentage
        ]);
      });
    });
  };

  const FileUpload = () => {
    const onDrop = (acceptedFiles) => {
      const convertedFiles = acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === FileReader.DONE) {
              const base64Data = reader.result.split(',')[1];
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                base64Data,
              });
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      });
    
      Promise.all(convertedFiles)
        .then((base64Files) => {
          setFiles((prevfiles) => [
            ...prevfiles,
            base64Files
          ]);
        })
        .catch((error) => {
          console.error('Error converting files:', error);
        });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
      <div className="overlap-group">
        <div {...getRootProps()} className="right-left">
          <input {...getInputProps()} />
          <div className="browse-file-icon">
            <img src={assets.uploadIcon} alt="" />
            <p>Drop your file here or browse</p>
          </div>
        </div>

        <div className="right-right">
          <div style={{padding: "5px"}}>
            {
              (files.length > 0) && (
                  files.map((file, index) => (
                    <UploadedFile key={index} file={file}/>
                  ))
              ) 
            }
            <button onClick={getPrediction}>Upload</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="main-container-scan">
      <div className="scan">
        <div className="box">
          <div className="scan-page">
            <div className="left">
              <div className="left-left">
                <img src={assets.farmer}/>
              </div>
              
              <div className="left-right">
                <p>
                  Let <span>technology</span> watch over your <br />
                  fields. <br />
                  You <span>focus</span> on growth, we'll <br />
                  handle the threats
                </p>
              </div>
            </div>

            <div className="right">
              <div className="engulf-right">
                <div className="right-heading">
                  <div className="text-wrapper-1">File Upload</div>
                  <p className="text-wrapper-2">Upload at least 3 images of the crops</p>
                </div>

                {/*This is the overall group (contains adding and listing of file)*/}
                <FileUpload/>
              </div>  
            </div>
          </div>
        </div>
      </div>
      {/* Render PredictionBox components for each prediction */}
      {prediction.map((percentages, index) => (
        <PredictionBox
          key={index}
          healthyPercent={percentages[0]}
          rustPercent={percentages[1]}
          powderyPercent={percentages[2]}
        />
      ))}
    </div>
  );
};

export default Scan;
