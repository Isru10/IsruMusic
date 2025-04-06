import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAudioRequest, fetchAudiosRequest } from '../features/audioSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DisplayAudio = () => {
  const { audios, loading, error } = useSelector((state) => state.audio);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAudiosRequest());
  }, [dispatch]);

  const handleDelete = async () => {
    const res = await axios.get('http://localhost:5000/api/audio-upload/demo');
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#1e4f5b] mb-8">🎧 My Music Collection</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {/* {error && <p className="text-center text-red-500">{error}</p>} */}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {audios.map((audio) => (
            <div
              key={audio._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{audio.title}</h3>
                <p className="text-sm text-gray-600 mb-4">🎤 {audio.artist}</p>
                <audio controls className="w-full rounded">
                  <source src={audio.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => dispatch(deleteAudioRequest(audio._id))}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
                >
                  Delete
                </button>

                <Link
                  to={`/update/${audio._id}`}
                  state={{ audio }}
                  className="w-full"
                >
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all">
                    Update
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayAudio;
