import { useState, useEffect } from 'react';
import './ProfileForm.css';
import { Link } from 'react-router-dom'; 

export default function ProfileForm({ profile, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    bio: '',
    headline: '',
    photoUrl: '',
    interests: '', 
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name,
        bio: profile.bio || '',
        headline: profile.headline || '',
        photoUrl: profile.photoUrl || '',
        interests: Array.isArray(profile.interests)
          ? profile.interests.join(', ')
          : profile.interests || '',
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const interestsArray = form.interests.split(',').map((interest) => interest.trim());

    const updatedForm = {
      ...form,
      interests: interestsArray,
    };

    try {
      await onSave(updatedForm);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" />
      <input name="headline" value={form.headline} onChange={handleChange} placeholder="Headline" />
      <input name="photoUrl" value={form.photoUrl} onChange={handleChange} placeholder="Photo URL" />
      <textarea name="interests" value={form.interests} onChange={handleChange} placeholder="Interests (comma separated)" />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
