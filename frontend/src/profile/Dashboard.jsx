import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ProfileForm from './ProfileForm';
import './Dashboard.css';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profile/me');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const createOrUpdateProfile = async (formData) => {
    try {
      if (profile) {
        await api.put('/profile', formData); 
      } else {
        await api.post('/profile', formData); 
      }
      fetchProfile();
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const deleteProfile = async () => {
    try {
      await api.delete('/profile');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getInterests = (interests) => {
    if (Array.isArray(interests)) {
      return interests.join(', ');
    }
    return interests ? interests.toString() : 'No interests listed';
  };

  return (
    <div className="dashboard-container">
      <h2>Your Profile</h2>
      {isEditing ? (
        <ProfileForm profile={profile} onSave={createOrUpdateProfile} onCancel={() => setIsEditing(false)} />
      ) : (
        <div>
          {profile ? (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Headline:</strong> {profile.headline}</p>
              <p><strong>Interests:</strong> {getInterests(profile.interests)}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button onClick={deleteProfile}>Delete Profile</button>
            </>
          ) : (
            <div>
              <p>No profile found. Please create one.</p>
              <button onClick={() => setIsEditing(true)}>Create Profile</button>
            </div>
          )}
          <Link to="/" className="back-btn">Go to feed</Link>
        </div>
      )}

    </div>
  );
}
