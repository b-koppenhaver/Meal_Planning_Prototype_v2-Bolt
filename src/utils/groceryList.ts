import { MealPlan, GroceryItem, Ingredient } from '../types';

export class GroceryListGenerator {
  private static consolidateIngredients(ingredients: Ingredient[]): GroceryItem[] {
    const consolidated: { [key: string]: GroceryItem } = {};

    ingredients.forEach(ingredient => {
      const key = `${ingredient.name.toLowerCase()}-${ingredient.unit}`;
      
      if (consolidated[key]) {
        consolidated[key].quantity += ingredient.quantity;
        if (!consolidated[key].recipes.includes(ingredient.name)) {
          consolidated[key].recipes.push(ingredient.name);
        }
      } else {
        consolidated[key] = {
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          category: ingredient.category,
          recipes: [ingredient.name]
        };
      }
    });

    return Object.values(consolidated);
  }

  private static convertUnits(items: GroceryItem[]): GroceryItem[] {
    // Group by ingredient name for unit conversion
    const byName: { [name: string]: GroceryItem[] } = {};
    
    items.forEach(item => {
      const name = item.name.toLowerCase();
      if (!byName[name]) byName[name] = [];
      byName[name].push(item);
    });

    const converted: GroceryItem[] = [];

    Object.values(byName).forEach(itemGroup => {
      if (itemGroup.length === 1) {
        converted.push(itemGroup[0]);
        return;
      }

      // Simple unit conversions
      let totalInBaseUnit = 0;
      let baseUnit = itemGroup[0].unit;
      let allRecipes: string[] = [];

      itemGroup.forEach(item => {
        allRecipes = [...allRecipes, ...item.recipes];
        
        // Convert to base unit (simplified conversions)
        if (item.unit === 'tbsp' && baseUnit === 'cup') {
          totalInBaseUnit += item.quantity / 16;
        } else if (item.unit === 'cup' && baseUnit === 'tbsp') {
          totalInBaseUnit = totalInBaseUnit * 16 + item.quantity;
          baseUnit = 'cup';
        } else {
          totalInBaseUnit += item.quantity;
        }
      });

      converted.push({
        name: itemGroup[0].name,
        quantity: Math.round(totalInBaseUnit * 100) / 100,
        unit: baseUnit,
        category: itemGroup[0].category,
        recipes: [...new Set(allRecipes)]
      });
    });

    return converted;
  }

  public static generateGroceryList(mealPlan: MealPlan[]): { [category: string]: GroceryItem[] } {
    // Collect all ingredients
    const allIngredients: Ingredient[] = [];
    
    mealPlan.forEach(meal => {
      allIngredients.push(...meal.recipe.ingredients);
    });

    // Consolidate and convert
    let groceryItems = this.consolidateIngredients(allIngredients);
    groceryItems = this.convertUnits(groceryItems);

    // Group by category
    const categorized: { [category: string]: GroceryItem[] } = {};
    
    groceryItems.forEach(item => {
      if (!categorized[item.category]) {
        categorized[item.category] = [];
      }
      categorized[item.category].push(item);
    });

    // Sort categories in store order
    const storeOrder = [
      'Produce',
      'Meat & Seafood',
      'Dairy & Eggs',
      'Pantry/Dry Goods',
      'Frozen',
      'Bakery',
      'Other'
    ];

    const sorted: { [category: string]: GroceryItem[] } = {};
    storeOrder.forEach(category => {
      if (categorized[category]) {
        sorted[category] = categorized[category].sort((a, b) => a.name.localeCompare(b.name));
      }
    });

    return sorted;
  }
}