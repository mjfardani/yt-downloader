import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchVideos = async () => {
    if (!url) {
      setError("URL tidak boleh kosong!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.agatz.xyz/api/ytmp4?url=${encodeURIComponent(url)}`
      );
      if (response.data.status === 200) {
        setVideos(response.data.data);
      } else {
        setError("Gagal mengambil data. Pastikan URL valid.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        YT Video Downloader
      </h1>

      <div className="w-full max-w-lg">
        <input
          type="text"
          placeholder="Masukkan URL YouTube"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />
        <button
          onClick={fetchVideos}
          className={`w-full bg-blue-500 text-white p-3 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Cari"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {videos.length > 0 && (
        <div className="w-full max-w-lg mt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Hasil Video:
          </h2>
          <ul className="space-y-4">
            {videos.map((video, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm"
              >
                <p className="font-medium text-gray-800">
                  {video.title} ({video.quality})
                </p>
                <a
                  href={video.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Download ({video.format})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
