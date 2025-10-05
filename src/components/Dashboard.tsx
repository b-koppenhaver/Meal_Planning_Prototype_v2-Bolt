import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { MealPlan, User, Recipe } from '../types';
import MealCard from './MealCard';
import RecipeModal from './RecipeModal';
import SwapMealModal from './SwapMealModal';
import { MealPlanGenerator } from '../utils/mealPlanning';
import { RefreshCw, TrendingUp, Calendar, Award, Move } from 'lucide-react';

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

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const newMealPlan = Array.from(mealPlan);
    const [reorderedItem] = newMealPlan.splice(sourceIndex, 1);
    
    // Update the date to match the new position
    const targetDate = newMealPlan[destinationIndex]?.date || mealPlan[destinationIndex].date;
    const updatedItem = { ...reorderedItem, date: targetDate };
    
    newMealPlan.splice(destinationIndex, 0, updatedItem);
    
    // Update all dates to maintain sequential order
    const startDate = new Date(mealPlan[0].date);
    const finalPlan = newMealPlan.map((meal, index) => {
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + index);
      return { ...meal, date: newDate.toISOString().split('T')[0] };
    });

    onUpdateMealPlan(finalPlan);
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
                <p className="text-sm text-gray-600">Proteins</p>
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
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">This Week</h2>
          <div className="ml-4 flex items-center text-sm text-gray-500">
            <Move className="h-4 w-4 mr-1" />
            Drag meals to reorder days
          </div>
        </div>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="meal-plan" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {mealPlan.map((meal, index) => (
                  <Draggable key={`meal-${meal.recipe.id}-${index}`} draggableId={`meal-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`transition-transform ${
                          snapshot.isDragging ? 'rotate-2 scale-105 shadow-lg' : ''
                        }`}
                      >
                        <MealCard
                          recipe={meal.recipe}
                          userRating={meal.userRating}
                          date={meal.date}
                          onRate={(rating) => handleRate(index, rating)}
                          onSwap={() => setSwapMealIndex(index)}
                          onViewRecipe={() => setSelectedRecipe(meal.recipe)}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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