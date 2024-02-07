// src/App.js
import React, { useState } from 'react';
import './App.css';

const FileConverterApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleConvert = () => {
    // Add logic for file conversion here (not implemented in this example)
    alert('File conversion logic not implemented in this example!');
  };

  return (
    <div className="app">
      <h1>File Converter App</h1>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div className="file-info">
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleConvert}>Convert</button>
        </div>
      )}
    </div>
  );
};

export default FileConverterApp;
