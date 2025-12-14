import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Wardrobe = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'shirt',
    color: '',
    brand: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/wardrobe');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        // Update existing item
        await api.put(`/wardrobe/${editingItem._id}`, formData);
      } else {
        // Create new item
        await api.post('/wardrobe', formData);
      }
      setShowModal(false);
      setEditingItem(null);
      setFormData({ name: '', category: 'shirt', color: '', brand: '', imageUrl: '' });
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Error saving item. Please try again.');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      category: item.category || 'shirt',
      color: item.color || '',
      brand: item.brand || '',
      imageUrl: item.imageUrl || '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ name: '', category: 'shirt', color: '', brand: '', imageUrl: '' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await api.delete(`/wardrobe/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const categories = ['shirt', 'pants', 'shoes', 'jacket', 'dress', 'accessories', 'other'];

  // Group items by category
  const groupItemsByCategory = (items) => {
    const grouped = {};
    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const groupedItems = groupItemsByCategory(items);

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
          <h1 className="text-3xl font-bold text-gray-900">My Wardrobe</h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            + Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">Your wardrobe is empty. Add your first item!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => {
              const categoryItems = groupedItems[category] || [];
              if (categoryItems.length === 0) return null;

              return (
                <div key={category} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                    {category.charAt(0).toUpperCase() + category.slice(1)} ({categoryItems.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryItems.map((item) => (
                      <div key={item._id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.category} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-gray-400 text-4xl">👕</span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg">{item.name || item.category.charAt(0).toUpperCase() + item.category.slice(1)}</h3>
                          <p className="text-gray-500 text-sm capitalize">{item.category}</p>
                          <p className="text-gray-600 text-sm">Color: {item.color}</p>
                          {item.brand && <p className="text-gray-600 text-sm">Brand: {item.brand}</p>}
                          <div className="mt-3 flex space-x-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="flex-1 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4">
                {editingItem ? 'Edit Wardrobe Item' : 'Add Wardrobe Item'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                      placeholder="e.g., Blue Denim Jacket, White Sneakers"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Brand (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500"
                      required
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
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

export default Wardrobe;

