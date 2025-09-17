import React from 'react';
import { X, Clock, Star } from 'lucide-react';
import { Recipe } from '../types';

interface SwapMealModalProps {
  currentRecipe: Recipe;
  alternatives: Recipe[];
  onSwap: (recipe: Recipe) => void;
  onClose: () => void;
}

export default function SwapMealModal({ currentRecipe, alternatives, onSwap, onClose }: SwapMealModalProps) {
  const getCuisineColor = (cuisine: string) => {
    const colors = {
      Italian: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800' },
      Mexican: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800' },
      Asian: { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-100 text-yellow-800' },
      Japanese: { bg: 'bg-pink-50', border: 'border-pink-200', badge: 'bg-pink-100 text-pink-800' },
      Mediterranean: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' },
      American: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' },
      British: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-800' },
      Indian: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800' },
      Spanish: { bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800' },
      French: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' }
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Swap Meal</h2>
              <p className="text-gray-600 mt-1">
                Choose an alternative to replace "{currentRecipe.name}"
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((recipe) => {
              const cuisineColors = getCuisineColor(recipe.cuisine);
              return (
              <div
                key={recipe.id}
                className={`${cuisineColors.bg} border ${cuisineColors.border} rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer`}
                onClick={() => onSwap(recipe)}
              >
                <div className="p-6">
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cuisineColors.badge}`}>
                      {recipe.cuisine}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.prepTime}min
                      </div>
                      <span className={`font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                        {recipe.difficulty}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {recipe.protein}
                    </span>
                  </div>

                  {recipe.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {recipe.tags.slice(0, 2).map((tag, index) => (
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

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSwap(recipe);
                    }}
                    className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    Select This Meal
                  </button>
                </div>
              </div>
              );
            })}
          </div>

          {alternatives.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Star className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No alternatives available
              </h3>
              <p className="text-gray-600">
                All suitable alternatives are already used in your current meal plan.
                Try regenerating your entire meal plan for more variety.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}