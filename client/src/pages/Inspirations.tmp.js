import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Inspirations = () => {
  const [inspirations, setInspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetchInspirations();
  }, []);

  const fetchInspirations = async () => {
    try {
      const response = await api.get('/inspirations');
      setInspirations(response.data);
    } catch (error) {
      console.error('Error fetching inspirations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inspirations', { imageUrl });
      setShowModal(false);
      setImageUrl('');
      fetchInspirations();
      alert('Inspiration imported! Similar items are being matched...');
    } catch (error) {
      console.error('Error importing inspiration:', error);
      alert('Error importing inspiration. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inspiration?')) {
      try {
        await api.delete(`/inspirations/${id}`);
        fetchInspirations();
      } catch (error) {
        console.error('Error deleting inspiration:', error);
        alert('Error deleting inspiration. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Outfit Inspirations</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            + Import Inspiration
          </button>
        </div>

        {inspirations.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              No inspirations yet. Import an outfit image to find similar pieces!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspirations.map((inspiration) => (
              <div key={inspiration._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  {inspiration.imageUrl ? (
                    <img
                      src={inspiration.imageUrl}
                      alt="Inspiration"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-4xl">🖼️</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Outfit Inspiration</h3>
                  {inspiration.matchedRecommendations && inspiration.matchedRecommendations.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Similar Items:</p>
                      <div className="space-y-2">
                        {inspiration.matchedRecommendations.slice(0, 2).map((rec, idx) => (
                          <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
                            <p className="font-medium">{rec.item}</p>
                            <p className="text-gray-600">{rec.price}</p>
                            <a
                              href={rec.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-800 text-xs"
                            >
                              View Item →
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => handleDelete(inspiration._id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">Import Outfit Inspiration</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL or Link
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                      placeholder="https://example.com/outfit-image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Paste a link to an outfit image. We'll find similar pieces for you.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
                  >
                    Import
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspirations;

