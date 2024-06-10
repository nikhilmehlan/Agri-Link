import { assets } from '../../assets/assets';
import React from 'react';
import './UploadedFile.css';

const UploadedFile = ({key, file}) => {
    return (
        <div key={key} className="uploaded-file">
            <img src={assets.fileIcon} alt="" />
            <p>{file[0].name}</p>
        </div>
    )
}

export default UploadedFile;