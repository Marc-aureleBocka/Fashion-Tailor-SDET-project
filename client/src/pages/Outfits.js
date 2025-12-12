import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Outfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    style: '',
    itemIds: [],
  });

  useEffect(() => {
    fetchOutfits();
    fetchWardrobeItems();
  }, []);

  const fetchOutfits = async () => {
    try {
      const response = await api.get('/outfits');
      setOutfits(response.data);
    } catch (error) {
      console.error('Error fetching outfits:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWardrobeItems = async () => {
    try {
      const response = await api.get('/wardrobe');
      setWardrobeItems(response.data);
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/outfits', formData);
      setShowModal(false);
      setFormData({ name: '', style: '', itemIds: [] });
      fetchOutfits();
    } catch (error) {
      console.error('Error creating outfit:', error);
      alert('Error creating outfit. Please try again.');
    }
  };

  const handleGenerate = async () => {
    try {
      const response = await api.post('/outfits/generate', { style: 'casual' });
      fetchOutfits();
      alert('Outfit generated successfully!');
    } catch (error) {
      console.error('Error generating outfit:', error);
      alert('Error generating outfit. Please make sure you have items in your wardrobe.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      try {
        await api.delete(`/outfits/${id}`);
        fetchOutfits();
      } catch (error) {
        console.error('Error deleting outfit:', error);
        alert('Error deleting outfit. Please try again.');
      }
    }
  };

  const toggleItemSelection = (itemId) => {
    setFormData((prev) => ({
      ...prev,
      itemIds: prev.itemIds.includes(itemId)
        ? prev.itemIds.filter((id) => id !== itemId)
        : [...prev.itemIds, itemId],
    }));
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
          <h1 className="text-3xl font-bold text-gray-900">My Outfits</h1>
          <div className="flex space-x-4">
            <button
              onClick={handleGenerate}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Generate Outfit
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              + Create Outfit
            </button>
          </div>
        </div>

        {outfits.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No outfits yet. Create your first outfit!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {outfits.map((outfit) => (
              <div key={outfit._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
                <h3 className="text-xl font-bold mb-2">{outfit.name}</h3>
                {outfit.style && (
                  <p className="text-gray-600 text-sm mb-4">Style: {outfit.style}</p>
                )}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {outfit.itemIds && outfit.itemIds.length > 0 ? (
                    outfit.itemIds.map((item) => (
                      <div key={item._id} className="bg-gray-100 p-2 rounded text-center text-sm">
                        {item.category}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No items</p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(outfit._id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Create Outfit</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Outfit Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Style
                    </label>
                    <input
                      type="text"
                      value={formData.style}
                      onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      placeholder="e.g., casual, formal, streetwear"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Items from Wardrobe
                    </label>
                    <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border border-gray-200 rounded-md p-4">
                      {wardrobeItems.map((item) => (
                        <label
                          key={item._id}
                          className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                            formData.itemIds.includes(item._id)
                              ? 'bg-primary-100'
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.itemIds.includes(item._id)}
                            onChange={() => toggleItemSelection(item._id)}
                            className="rounded"
                          />
                          <span className="text-sm capitalize">
                            {item.category} - {item.color}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
                  >
                    Create Outfit
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

export default Outfits;

