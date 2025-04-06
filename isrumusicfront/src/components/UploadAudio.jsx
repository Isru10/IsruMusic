import { useDispatch } from "react-redux";
// import { uploadAudioRequest } from "../features/imageSlice";
import { uploadAudioRequest } from "../features/audioSlice";
import { useState } from "react";
import axios from "axios";
import DisplayAudio from "./DisplayAudio";
import { useNavigate } from "react-router-dom";

const UploadAudio = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();


const uploadFile = async (audioUrl) => {
  const data = new FormData();
  data.append("file", audioUrl);
  data.append("upload_preset", 'audios_preset');
  data.append("folder", "audios"); // Explicitly set the folder

  try {
    const cloudName = "dni9bl2pk"; // Replace with your Cloudinary cloud name
    const resourceType ="video";
    const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    const res = await axios.post(api, data);
    const { secure_url } = res.data;
    return secure_url;
  } catch (err) {
    throw new Error(err.message);
  }
};




  const handleSubmit = async (e) => {
    e.preventDefault();
    // setArtist(true);
    // const audio = {
    //   title,
    //   audioUrl,
    //   artist
    // }
    if (!audioUrl){
      alert("audio needed")
      return
    }
    const audioData = new FormData()
    audioData.append("title",title)
    // audioData.append("audioUrl",audioUrl)  wait a minute!!
    audioData.append("artist",artist)
    audioData.append("upload_preset","audios_preset");
    // Dispatch the action to trigger the saga
    // console.log(audioData.values())
    // for (let [key, value] of audioData.entries()) {
    //   console.log(key, value);
    // }

    // just before the dipatch call the upload function and carry the secure url and give it to dispatch function 
    const  responseUrl = await uploadFile(audioUrl)
    console.log(responseUrl )
    dispatch(uploadAudioRequest({title,artist,audioUrl:responseUrl} ));
    navigate("/")
    // setTitle(null);
    // setAudioUrl(null);
  };

  return (

    // <div>


    // <form onSubmit={handleSubmit}>
    //   {/* Image and video file input fields */}
    //   {/* <input type="file" onChange={(e) => setTitle(e.target.files[0])} /> */}
    //   <input placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
    //   <input type="text" placeholder="artist name" value={artist} onChange={(e) => setArtist(e.target.value)}/>
    //   <input type="file" accept='audio/*' onChange={(e) => setAudioUrl(e.target.files[0])} required />
    //   <button type="submit">Upload</button>
    // </form>


    //     {/* <DisplayAudio/> */}

    // </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-center text-[#1e4f5b]">🎵 Upload Audio</h2>
  
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Title</label>
        <input
          placeholder="Enter title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
        />
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Artist Name</label>
        <input
          placeholder="Enter artist name"
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1e4f5b] focus:border-[#1e4f5b] outline-none"
        />
      </div>
  
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Audio File</label>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioUrl(e.target.files[0])}
          required
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#1e4f5b] file:text-white hover:file:bg-[#163b44]"
        />
      </div>
  
      <button
        type="submit"
        className="w-full py-2 px-4 bg-[#1e4f5b] hover:bg-[#163b44] text-white font-semibold rounded-lg transition-all"
      >
        Upload
      </button>
    </form>
  </div>
  
  );
};

export default UploadAudio;
