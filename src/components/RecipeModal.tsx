import React from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export default function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  const getCuisineColor = (cuisine: string) => {
    const colors = {
      Italian: 'bg-red-100 text-red-800',
      Mexican: 'bg-orange-100 text-orange-800',
      Asian: 'bg-yellow-100 text-yellow-800',
      Japanese: 'bg-pink-100 text-pink-800',
      Mediterranean: 'bg-blue-100 text-blue-800',
      American: 'bg-purple-100 text-purple-800',
      British: 'bg-green-100 text-green-800',
      Indian: 'bg-amber-100 text-amber-800',
      Spanish: 'bg-rose-100 text-rose-800',
      French: 'bg-indigo-100 text-indigo-800'
    };
    return colors[cuisine as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: 'text-green-600',
      Intermediate: 'text-yellow-600',
      Advanced: 'text-red-600'
    };
    return colors[difficulty as keyof typeof colors] || 'text-gray-600';
  };

  const groupedIngredients = recipe.ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as { [key: string]: typeof recipe.ingredients });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative border-b border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCuisineColor(recipe.cuisine)}`}>
                    {recipe.cuisine}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{recipe.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{recipe.prepTime} minutes</span>
              </div>
              <div className="flex items-center">
                <ChefHat className="h-5 w-5 mr-2 text-gray-600" />
                <span className={`font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>4 servings</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {recipe.protein}
            </span>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
            <div className="space-y-4">
              {Object.entries(groupedIngredients).map(([category, ingredients]) => (
                <div key={category} className="border-l-4 border-emerald-200 pl-4">
                  <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                  <ul className="space-y-1">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-600">
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {recipe.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}