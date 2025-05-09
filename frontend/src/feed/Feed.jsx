import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Feed.css';

export default function Feed() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchProfiles = async (page) => {
    try {
      const response = await api.get(`/profile/feed?page=${page}&limit=10`);
      setProfiles(response.data);
    } catch (err) {
      setError('Failed to load profiles.');
      console.error('Error fetching profiles:', err);
    }
  };

  useEffect(() => {
    fetchProfiles(page);
  }, [page]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="feed-container">
      <h2>Public Feed</h2>
      <Link to="/profile" className="back-btn">Back to Profile</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div className="profile-cards">
        {profiles.length === 0 ? (
          <p>No profiles available</p>
        ) : (
          profiles.map((profile) => (
            <div key={profile.id} className="profile-card">
              <img
                src={profile.photoUrl || 'https://via.placeholder.com/150'}
                alt={profile.name}
                className="profile-photo"
              />
              <div className="profile-info">
                <h3>{profile.name}</h3>
                <p><strong>Headline:</strong> {profile.headline}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
                <p><strong>Interests:</strong> {Array.isArray(profile.interests) ? profile.interests.join(', ') : 'N/A'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page <= 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
