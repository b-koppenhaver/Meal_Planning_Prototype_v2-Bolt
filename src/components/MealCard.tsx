import React from 'react';
import { Clock, Star, StarOff, RotateCcw, Eye } from 'lucide-react';
import { Recipe } from '../types';

interface MealCardProps {
  recipe: Recipe;
  userRating?: number;
  date: string;
  onRate: (rating: number) => void;
  onSwap: () => void;
  onViewRecipe: () => void;
}

export default function MealCard({ 
  recipe, 
  userRating, 
  date, 
  onRate, 
  onSwap, 
  onViewRecipe 
}: MealCardProps) {
  const getCuisineColor = (cuisine: string) => {
    const colors = {
      Italian: { bg: 'bg-red-50', border: 'border-red-300', badge: 'bg-red-200 text-red-800' },
      Mexican: { bg: 'bg-orange-50', border: 'border-orange-300', badge: 'bg-orange-200 text-orange-800' },
      Asian: { bg: 'bg-yellow-50', border: 'border-yellow-300', badge: 'bg-yellow-200 text-yellow-800' },
      Japanese: { bg: 'bg-pink-50', border: 'border-pink-300', badge: 'bg-pink-200 text-pink-800' },
      Mediterranean: { bg: 'bg-blue-50', border: 'border-blue-300', badge: 'bg-blue-200 text-blue-800' },
      American: { bg: 'bg-purple-50', border: 'border-purple-300', badge: 'bg-purple-200 text-purple-800' },
      British: { bg: 'bg-green-50', border: 'border-green-300', badge: 'bg-green-200 text-green-800' },
      Indian: { bg: 'bg-amber-50', border: 'border-amber-300', badge: 'bg-amber-200 text-amber-800' },
      Spanish: { bg: 'bg-violet-50', border: 'border-violet-300', badge: 'bg-violet-200 text-rose-800' },
      French: { bg: 'bg-indigo-50', border: 'border-indigo-300', badge: 'bg-indigo-200 text-indigo-800' }
    };
    return colors[cuisine as keyof typeof colors] || { 
      bg: 'bg-gray-50', 
      border: 'border-gray-200', 
      badge: 'bg-gray-100 text-gray-800' 
    };
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: 'text-green-600',
      Intermediate: 'text-yellow-600',
      Advanced: 'text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-600';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const cuisineColors = getCuisineColor(recipe.cuisine);

  return (
    <div className={`${cuisineColors.bg} rounded-lg shadow-sm border ${cuisineColors.border} overflow-hidden hover:shadow-md transition-all duration-200`}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cuisineColors.badge}`}>
                {recipe.cuisine}
              </span>
              <span className="text-xs text-gray-500">{formatDate(date)}</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.name}</h3>
          </div>
          <div className="flex space-x-1 ml-4">
            <button
              onClick={onViewRecipe}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="View Recipe"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={onSwap}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Swap Meal"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recipe.prepTime}min
            </div>
            <span className={`font-medium ${getDifficultyColor(recipe.difficulty)}`}>
              {recipe.difficulty}
            </span>
          </div>
          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full border border-gray-300">
            {recipe.protein}
          </span>
        </div>

        {recipe.tags.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {recipe.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRate(star)}
                className="hover:scale-110 transition-transform"
              >
                {userRating && star <= userRating ? (
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                ) : (
                  <StarOff className="h-4 w-4 text-gray-300 hover:text-yellow-400" />
                )}
              </button>
            ))}
          </div>
          
          {userRating && (
            <span className="text-xs text-gray-500">
              Your rating: {userRating}/5
            </span>
          )}
        </div>
      </div>
    </div>
  );
}