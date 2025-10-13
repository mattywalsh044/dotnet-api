import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // We'll style it next

function App() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://firstmatty-netapi.onrender.com/api/photos/upload", 
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">WalshWebSave</h1>
      <p className="subtitle">Simple, Secure Image Upload to the Cloud</p>

      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {imageUrl && (
        <div className="result">
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default App;
