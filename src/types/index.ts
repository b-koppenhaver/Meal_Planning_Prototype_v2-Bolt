export interface User {
  id: string;
  name: string;
  email: string;
  dietaryRestrictions: string[];
  cuisinePreferences: string[];
  foodDislikes: string[];
  prepTimePreference: string;
  cookingLevel: string;
  ratings: { [mealId: string]: number };
}

export interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  protein: string;
  prepTime: number;
  difficulty: string;
  ingredients: Ingredient[];
  tags: string[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

export interface MealPlan {
  date: string;
  recipe: Recipe;
  userRating?: number;
}

export interface GroceryItem {
  name: string;
  quantity: number;
  unit: string;
  category: string;
  recipes: string[];
}