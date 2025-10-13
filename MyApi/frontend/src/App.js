import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load gallery on first render
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("https://firstmatty-netapi.onrender.com/api/photos/all");
        setGallery(res.data);
        console.log("Loaded gallery:", res.data); // optional: for debugging
      } catch (err) {
        console.error("Failed to load gallery:", err);
      }
    };

    fetchGallery();
  }, []);

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

      const newImageUrl = res.data.imageUrl;
      setGallery([newImageUrl, ...gallery]); // Add new image to gallery
      setFile(null);
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

      {gallery.length > 0 && (
        <div className="gallery">
          <h2>Your Uploads</h2>
          <div className="gallery-grid">
            {gallery.map((url, index) => (
              <div key={index} className="gallery-item">
                <img src={url} alt={`Uploaded ${index}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
