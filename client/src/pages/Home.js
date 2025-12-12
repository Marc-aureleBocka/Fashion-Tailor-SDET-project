import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
            Welcome to{' '}
            <span className="text-primary-600">Fashion Tailor</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Your personal AI-powered fashion assistant. Discover outfits tailored to your style,
            manage your virtual wardrobe, and get inspired by the latest fashion trends.
          </p>
        </div>

        {!user ? (
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-700 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border-2 border-primary-600"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/wardrobe"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">👔</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Virtual Wardrobe</h3>
                <p className="text-gray-600">
                  Add and manage your clothing items. Build your digital closet.
                </p>
              </div>
            </Link>

            <Link
              to="/outfits"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Outfit Generator</h3>
                <p className="text-gray-600">
                  Create stunning outfits from your wardrobe or get AI recommendations.
                </p>
              </div>
            </Link>

            <Link
              to="/inspirations"
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Inspirations</h3>
                <p className="text-gray-600">
                  Import outfit images and find similar pieces from online retailers.
                </p>
              </div>
            </Link>
          </div>
        )}

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-2">Style Selection</h4>
              <p className="text-gray-600 text-sm">
                Choose from predefined styles or customize your own fashion preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-2">AI Recommendations</h4>
              <p className="text-gray-600 text-sm">
                Get personalized outfit suggestions based on your style and wardrobe.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-2">Image Recognition</h4>
              <p className="text-gray-600 text-sm">
                Upload outfit images and automatically detect clothing items.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-lg mb-2">Shopping Links</h4>
              <p className="text-gray-600 text-sm">
                Find and purchase similar items from online retailers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

