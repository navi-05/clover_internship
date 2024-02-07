import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

const ImageToTextConverterApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    if (file) {
      extractTextFromImage(file);
    }
  };

  const extractTextFromImage = (imageFile) => {
    Tesseract.recognize(
      imageFile,
      'eng', // Language code for English
      { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
      setExtractedText(text);
    });
  };

  return (
    <div className="app">
      <h1>Image to Text Converter</h1>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <div className="image-container">
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        </div>
      )}
      {extractedText && (
        <div className="text-container">
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ImageToTextConverterApp;
