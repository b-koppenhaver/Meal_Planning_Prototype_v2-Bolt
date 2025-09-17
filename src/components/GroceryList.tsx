import React, { useState } from 'react';
import { Check, ShoppingCart, Package } from 'lucide-react';
import { GroceryListGenerator } from '../utils/groceryList';
import { MealPlan } from '../types';

interface GroceryListProps {
  mealPlan: MealPlan[];
}

export default function GroceryList({ mealPlan }: GroceryListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  
  const groceryList = GroceryListGenerator.generateGroceryList(mealPlan);
  
  const toggleItem = (itemKey: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemKey)) {
      newChecked.delete(itemKey);
    } else {
      newChecked.add(itemKey);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = Object.values(groceryList).flat().length;
  const checkedCount = checkedItems.size;
  const completionPercentage = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Produce': '🥕',
      'Meat & Seafood': '🥩',
      'Dairy & Eggs': '🥛',
      'Pantry/Dry Goods': '🥫',
      'Frozen': '🧊',
      'Bakery': '🍞',
      'Other': '📦'
    };
    return icons[category as keyof typeof icons] || '📦';
  };

  const formatQuantity = (quantity: number, unit: string) => {
    // Round to reasonable precision
    const rounded = quantity % 1 === 0 ? quantity : Math.round(quantity * 100) / 100;
    return `${rounded} ${unit}${rounded !== 1 ? 's' : ''}`.replace(/ss$/, 's');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="h-8 w-8 mr-3 text-emerald-600" />
              Grocery List
            </h1>
            <p className="text-gray-600 mt-2">
              Smart consolidation from your 14-day meal plan
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">
              {completionPercentage}%
            </div>
            <div className="text-sm text-gray-500">
              {checkedCount} of {totalItems} items
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {Object.keys(groceryList).length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No grocery list available
          </h3>
          <p className="text-gray-600">
            Generate a meal plan first to see your shopping list.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groceryList).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="text-2xl mr-3">{getCategoryIcon(category)}</span>
                  {category}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({items.length} items)
                  </span>
                </h2>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {items.map((item, index) => {
                    const itemKey = `${category}-${item.name}-${index}`;
                    const isChecked = checkedItems.has(itemKey);
                    
                    return (
                      <div
                        key={itemKey}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isChecked 
                            ? 'bg-emerald-50 border border-emerald-200' 
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center flex-1">
                          <button
                            onClick={() => toggleItem(itemKey)}
                            className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-gray-300 hover:border-emerald-400'
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3" />}
                          </button>
                          
                          <div className="flex-1">
                            <div className={`font-medium ${
                              isChecked ? 'text-emerald-800 line-through' : 'text-gray-900'
                            }`}>
                              {formatQuantity(item.quantity, item.unit)} {item.name}
                            </div>
                            
                            {item.recipes.length > 1 && (
                              <div className="text-xs text-gray-500 mt-1">
                                Used in {item.recipes.length} recipes
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 ml-4">
                          {formatQuantity(item.quantity, item.unit)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-emerald-800 mb-2">
            Smart Shopping Tips
          </h3>
          <ul className="text-sm text-emerald-700 space-y-1">
            <li>• Items are grouped by store section for efficient shopping</li>
            <li>• Quantities are automatically consolidated across recipes</li>
            <li>• Check items off as you shop to track progress</li>
            <li>• Consider buying extra portions of highly-rated meals</li>
          </ul>
        </div>
      )}
    </div>
  );
}