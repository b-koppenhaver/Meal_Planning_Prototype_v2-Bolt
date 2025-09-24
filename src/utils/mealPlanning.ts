import { Recipe, MealPlan, User } from '../types';
import { recipes } from '../data/recipes';

export class MealPlanGenerator {
  private static getWeightedScore(recipe: Recipe, user: User): number {
    let score = 3; // Base score

    // Cuisine preference bonus
    if (user.cuisinePreferences.includes(recipe.cuisine)) {
      score += 2;
    }

    // Previous rating bonus/penalty
    const userRating = user.ratings[recipe.id];
    if (userRating) {
      score += (userRating - 3); // Convert 1-5 scale to -2 to +2
    }

    // Cooking level match
    const levelMatch = this.matchesCookingLevel(recipe.difficulty, user.cookingLevel);
    if (levelMatch) score += 1;

    // Prep time preference
    const timeMatch = this.matchesPrepTime(recipe.prepTime, user.prepTimePreference);
    if (timeMatch) score += 1;

    return Math.max(0, score);
  }

  private static matchesCookingLevel(recipeDifficulty: string, userLevel: string): boolean {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const recipeIndex = levels.indexOf(recipeDifficulty);
    const userIndex = levels.indexOf(userLevel);
    
    return recipeIndex <= userIndex;
  }

  private static matchesPrepTime(recipeTime: number, userPreference: string): boolean {
    switch (userPreference) {
      case '15-30 minutes':
        return recipeTime <= 30;
      case '30-45 minutes':
        return recipeTime >= 25 && recipeTime <= 45;
      case '45+ minutes':
        return recipeTime >= 40;
      default:
        return true;
    }
  }

  private static checkDiversityConstraints(
    plannedMeals: MealPlan[],
    newRecipe: Recipe,
    weekStart: number = 0
  ): boolean {
    // Check cuisine diversity (max 1 per week for 7-day plan)
    const currentWeekMeals = plannedMeals;
    const cuisineCount = currentWeekMeals.filter(
      meal => meal.recipe.cuisine === newRecipe.cuisine
    ).length;
    
    if (cuisineCount >= 1) return false;

    // Check protein diversity (max 2 per week)
    const proteinCount = plannedMeals.filter(
      meal => meal.recipe.protein === newRecipe.protein
    ).length;
    
    if (proteinCount >= 2) return false;

    // Check exact recipe repeats
    const recipeCount = plannedMeals.filter(
      meal => meal.recipe.id === newRecipe.id
    ).length;
    
    if (recipeCount >= 1) return false;

    return true;
  }

  public static generateMealPlan(user: User, startDate: Date): MealPlan[] {
    const mealPlan: MealPlan[] = [];
    const availableRecipes = [...recipes];

    for (let day = 0; day < 7; day++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + day);
      
      const weekStart = 0; // Only one week now
      
      // Get suitable recipes that meet diversity constraints
      const suitableRecipes = availableRecipes.filter(recipe => 
        this.checkDiversityConstraints(mealPlan, recipe, weekStart)
      );

      if (suitableRecipes.length === 0) {
        // Fallback: choose from all recipes if constraints are too restrictive
        const fallbackRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
        mealPlan.push({
          date: currentDate.toISOString().split('T')[0],
          recipe: fallbackRecipe,
          userRating: user.ratings[fallbackRecipe.id]
        });
        continue;
      }

      // Weight recipes by user preferences and ratings
      const weightedRecipes = suitableRecipes.map(recipe => ({
        recipe,
        weight: this.getWeightedScore(recipe, user)
      }));

      // Select recipe using weighted random selection
      const totalWeight = weightedRecipes.reduce((sum, item) => sum + item.weight, 0);
      let random = Math.random() * totalWeight;
      
      let selectedRecipe = weightedRecipes[0].recipe;
      for (const item of weightedRecipes) {
        random -= item.weight;
        if (random <= 0) {
          selectedRecipe = item.recipe;
          break;
        }
      }

      mealPlan.push({
        date: currentDate.toISOString().split('T')[0],
        recipe: selectedRecipe,
        userRating: user.ratings[selectedRecipe.id]
      });
    }

    return mealPlan;
  }

  public static getAlternativeMeals(
    currentRecipe: Recipe,
    existingPlan: MealPlan[],
    user: User,
    dayIndex: number
  ): Recipe[] {
    const weekStart = 0; // Only one week
    const otherMeals = existingPlan.filter((_, index) => index !== dayIndex);

    const alternatives = recipes.filter(recipe => 
      recipe.id !== currentRecipe.id &&
      this.checkDiversityConstraints(otherMeals, recipe, weekStart)
    );

    // Sort by user preference score
    return alternatives
      .sort((a, b) => this.getWeightedScore(b, user) - this.getWeightedScore(a, user))
      .slice(0, 3);
  }
}