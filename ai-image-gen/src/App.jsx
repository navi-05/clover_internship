// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const ImageGenerationApp = () => {
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false)
  const [imageGenerated, setImageGenerated] = useState(false)
  const [generatedImage, setGeneratedImage] = useState();

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          prompt: textInput,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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',
          },
        }
      );
      setGeneratedImage(response.data)
      setImageGenerated(true)
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="app">
      <h1>DALL-E Image Generation</h1>
      <div className="input-container">
        <textarea
          placeholder="Enter a textual description for image generation..."
          value={textInput}
          onChange={handleTextChange}
        ></textarea>
        <button onClick={handleGenerateImage}>Generate Image</button>
      </div>
      {loading && (
        <>Loading...</>
      )}
      {imageGenerated && (
        <div className="output-container">
          <img src={generatedImage.data[0]?.url} alt="Generated Image" />
        </div>
      )}
    </div>
  );
};

export default ImageGenerationApp;
