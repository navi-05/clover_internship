import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react'

const MusicPlayer = () => {
  const [trackList, setTrackList] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Make a request to Shazam API using your Rapid API key
    // Update the endpoint and headers based on the Shazam API documentation
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://shazam.p.rapidapi.com/charts/track',
        params: {
          locale: 'en-US',
          pageSize: '10',
          startFrom: '0'
        },
        headers: {
          'X-RapidAPI-Key': 'dcbc879a96mshd3f8dbe552e4c45p1465fdjsn1265f315913c',
          'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
        }
      };
      
      try {
        setIsLoading(true)
        const response = await axios.request(options);
        setTrackList(response.data.tracks);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
  };

  return (
    <div>
      <h1>Shazam Music Player</h1>
      {isLoading ? (
        <Loader2 className="spinner" />
      ) : (
        <ul>
          {trackList.map((track, i) => (
            <li key={i}>
              <a href={track.url} target='_blank'>{track.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MusicPlayer;
