import React, { useState } from 'react';
import axios from 'axios';
import api from './Api';

const Test = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

 // Frontend function to upload image
 const sendFileToBackend = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:3000/dataset-image', {
      method: 'POST',
      body: formData,
    });

    // Check if the response is OK before parsing JSON
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Try to parse JSON if response is successful
    const data = await response.json();
    console.log('Upload response from backend:', data);
    setMessage(data.message || 'Upload successful');
  } catch (error) {
    console.error('Error sending file to backend:', error);
    setMessage('Failed to upload file');
  }
};



  return (
    <div className='pt-[140px]'>
      <h1>Upload a File</h1>
      <form onSubmit={(e)=>sendFileToBackend(e)}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Test;


// 6b327375-8860-4147-b47f-687435648340
