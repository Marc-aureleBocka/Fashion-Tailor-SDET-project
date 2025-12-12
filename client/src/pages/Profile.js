import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [message, setMessage] = useState('');

  const availableStyles = [
    'streetwear',
    'business casual',
    'minimalist',
    'bohemian',
    'classic',
    'sporty',
    'vintage',
    'modern',
    'elegant',
    'casual',
  ];

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setSelectedStyles(user.preferredStyles || []);
    }
  }, [user]);

  const handleStyleToggle = (style) => {
    setSelectedStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(name, selectedStyles);
    if (result.success) {
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(result.error || 'Error updating profile');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          {message && (
            <div
              className={`mb-4 p-4 rounded ${
                message.includes('success')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Preferred Styles
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleStyleToggle(style)}
                      className={`px-4 py-2 rounded-md border-2 transition ${
                        selectedStyles.includes(style)
                          ? 'bg-primary-100 border-primary-600 text-primary-700'
                          : 'bg-white border-gray-300 text-gray-700 hover:border-primary-300'
                      }`}
                    >
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Select your preferred fashion styles to get personalized recommendations.
                </p>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

