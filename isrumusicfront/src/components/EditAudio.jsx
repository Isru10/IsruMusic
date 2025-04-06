import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateAudioRequest } from "../features/audioSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditAudio = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const fetched_audio = state.audio;

  const [title, setTitle] = useState(fetched_audio.title || "");
  const [artist, setArtist] = useState(fetched_audio.artist || "");
  const [audioUrl, setAudioUrl] = useState(fetched_audio.audioUrl || "");
  const [newAudio, setNewAudio] = useState(null);

  const uploadFile = async (audioUrl) => {
    const data = new FormData();
    data.append("file", audioUrl);
    data.append("upload_preset", "audios_preset");

    try {
      const cloudName = "dni9bl2pk";
      const resourceType = "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let finalAudioUrl = audioUrl;
    if (newAudio) {
      const response = await uploadFile(newAudio);
      finalAudioUrl = response;
    }

    dispatch(updateAudioRequest({ id, title, artist, audioUrl: finalAudioUrl }));
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-[#1e4f5b]">✏️ Edit Audio</h2>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
          <input
            placeholder="Edit title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Artist Name</label>
          <input
            placeholder="Edit artist name"
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">Replace Audio (optional)</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setNewAudio(e.target.files[0])}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1e4f5b] file:text-white hover:file:bg-[#163b44]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#1e4f5b] hover:bg-[#163b44] text-white font-semibold rounded-lg transition-all"
        >
          Update Audio
        </button>
      </form>
    </div>
  );
};

export default EditAudio;
