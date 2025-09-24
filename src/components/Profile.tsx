import React from 'react';
import { User, Star, TrendingUp, Award } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user }: ProfileProps) {
  const ratedMeals = Object.keys(user.ratings).length;
  const averageRating = ratedMeals > 0 
    ? Object.values(user.ratings).reduce((sum, rating) => sum + rating, 0) / ratedMeals
    : 0;

  const ratingDistribution = Object.values(user.ratings).reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  const favoriteRatings = Object.entries(user.ratings)
    .filter(([_, rating]) => rating >= 4)
    .length;

  const cuisinePreferencesList = user.cuisinePreferences.length > 0 
    ? user.cuisinePreferences.join(', ') 
    : 'None specified';

  const dietaryRestrictionsList = user.dietaryRestrictions.length > 0 
    ? user.dietaryRestrictions.join(', ') 
    : 'None';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-8 text-white">
          <div className="flex items-center">
            <div className="bg-white/20 backdrop-blur rounded-full p-4 mr-4">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-emerald-100">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rating Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-emerald-600 mr-2" />
                <div>
                  <p className="text-sm text-emerald-700">Average Rating</p>
                  <p className="text-xl font-bold text-emerald-900">
                    {averageRating.toFixed(1)}/5
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <div>
                  <p className="text-sm text-blue-700">Meals Rated</p>
                  <p className="text-xl font-bold text-blue-900">{ratedMeals}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-600 mr-2" />
                <div>
                  <p className="text-sm text-purple-700">Favorites (4+ stars)</p>
                  <p className="text-xl font-bold text-purple-900">{favoriteRatings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        {ratedMeals > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Rating Distribution</h2>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingDistribution[stars] || 0;
                const percentage = ratedMeals > 0 ? (count / ratedMeals) * 100 : 0;
                
                return (
                  <div key={stars} className="flex items-center space-x-3">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium text-gray-700">{stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-current ml-1" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preferences Section */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cuisine Preferences</h3>
              <p className="text-gray-600">{cuisinePreferencesList}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</h3>
              <p className="text-gray-600">{dietaryRestrictionsList}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Prep Time Preference</h3>
              <p className="text-gray-600">{user.prepTimePreference}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Cooking Level</h3>
              <p className="text-gray-600">{user.cookingLevel}</p>
            </div>
          </div>
        </div>

        {/* Food Dislikes */}
        {user.foodDislikes.length > 0 && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Food Dislikes</h3>
            <div className="flex flex-wrap gap-2">
              {user.foodDislikes.map((dislike, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {dislike}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Learning Algorithm Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          How We Learn Your Preferences
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Higher-rated cuisines appear more frequently in future plans</li>
          <li>• Your cooking level and prep time preferences filter suitable recipes</li>
          <li>• Food dislikes are automatically avoided in meal generation</li>
          <li>• The system maintains weekly diversity while optimizing for your taste preferences</li>
          <li>• Rating more meals improves the personalization of your meal plans</li>
        </ul>
      </div>
    </div>
  );
}