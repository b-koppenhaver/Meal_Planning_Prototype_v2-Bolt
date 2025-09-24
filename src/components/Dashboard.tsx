import React, { useState } from 'react';
import { MealPlan, User, Recipe } from '../types';
import MealCard from './MealCard';
import RecipeModal from './RecipeModal';
import SwapMealModal from './SwapMealModal';
import { MealPlanGenerator } from '../utils/mealPlanning';
import { RefreshCw, TrendingUp, Calendar, Award } from 'lucide-react';

interface DashboardProps {
  mealPlan: MealPlan[];
  user: User;
  onUpdateMealPlan: (newPlan: MealPlan[]) => void;
  onUpdateUser: (updatedUser: User) => void;
}

export default function Dashboard({ mealPlan, user, onUpdateMealPlan, onUpdateUser }: DashboardProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [swapMealIndex, setSwapMealIndex] = useState<number | null>(null);

  const handleRate = (mealIndex: number, rating: number) => {
    const meal = mealPlan[mealIndex];
    const updatedRatings = { ...user.ratings, [meal.recipe.id]: rating };
    const updatedUser = { ...user, ratings: updatedRatings };
    
    const updatedPlan = mealPlan.map((m, i) => 
      i === mealIndex ? { ...m, userRating: rating } : m
    );
    
    onUpdateUser(updatedUser);
    onUpdateMealPlan(updatedPlan);
  };

  const handleSwapMeal = (mealIndex: number, newRecipe: Recipe) => {
    const updatedPlan = mealPlan.map((meal, i) =>
      i === mealIndex 
        ? { ...meal, recipe: newRecipe, userRating: user.ratings[newRecipe.id] }
        : meal
    );
    onUpdateMealPlan(updatedPlan);
    setSwapMealIndex(null);
  };

  const regenerateMealPlan = () => {
    const startDate = new Date();
    const newPlan = MealPlanGenerator.generateMealPlan(user, startDate);
    onUpdateMealPlan(newPlan);
  };

  // Calculate stats
  const averageRating = Object.values(user.ratings).length > 0 
    ? Object.values(user.ratings).reduce((sum, rating) => sum + rating, 0) / Object.values(user.ratings).length
    : 0;

  const cuisineDistribution = mealPlan.reduce((acc, meal) => {
    acc[meal.recipe.cuisine] = (acc[meal.recipe.cuisine] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const proteinDistribution = mealPlan.reduce((acc, meal) => {
    acc[meal.recipe.protein] = (acc[meal.recipe.protein] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Calculate proper diversity score as percentage
  const calculateDiversityScore = () => {
    const uniqueCuisines = Object.keys(cuisineDistribution).length;
    const uniqueProteins = Object.keys(proteinDistribution).length;
    
    // Maximum possible diversity in 7 days (reasonable limits)
    const maxCuisines = Math.min(7, 10); // Max 7 different cuisines in 7 days
    const maxProteins = Math.min(7, 6);  // Max 6 different protein types available
    
    // Calculate weighted diversity score
    const cuisineScore = (uniqueCuisines / maxCuisines) * 60; // 60% weight for cuisine diversity
    const proteinScore = (uniqueProteins / maxProteins) * 40;  // 40% weight for protein diversity
    
    return Math.min(100, Math.round(cuisineScore + proteinScore));
  };

  const diversityScore = calculateDiversityScore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with stats */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Meal Plan</h1>
          </div>
          <button
            onClick={regenerateMealPlan}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Regenerate Plan
          </button>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-lg font-semibold">{averageRating.toFixed(1)}/5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Cuisines</p>
                <p className="text-lg font-semibold">{Object.keys(cuisineDistribution).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 border border-gray-300 rounded px-2 py-0.5 inline-block">Proteins</p>
                <p className="text-lg font-semibold">{Object.keys(proteinDistribution).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <RefreshCw className="h-5 w-5 text-orange-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Diversity Score</p>
                <p className="text-lg font-semibold">
                  {diversityScore}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Meal Plan */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mealPlan.map((meal, index) => (
            <MealCard
              key={`day-${index}`}
              recipe={meal.recipe}
              userRating={meal.userRating}
              date={meal.date}
              onRate={(rating) => handleRate(index, rating)}
              onSwap={() => setSwapMealIndex(index)}
              onViewRecipe={() => setSelectedRecipe(meal.recipe)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {swapMealIndex !== null && (
        <SwapMealModal
          currentRecipe={mealPlan[swapMealIndex].recipe}
          alternatives={MealPlanGenerator.getAlternativeMeals(
            mealPlan[swapMealIndex].recipe,
            mealPlan,
            user,
            swapMealIndex
          )}
          onSwap={(recipe) => handleSwapMeal(swapMealIndex, recipe)}
          onClose={() => setSwapMealIndex(null)}
        />
      )}
    </div>
  );
}