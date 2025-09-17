import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: 'chicken-parmesan',
    name: 'Chicken Parmesan',
    cuisine: 'Italian',
    protein: 'Chicken',
    prepTime: 45,
    difficulty: 'Intermediate',
    tags: ['comfort food', 'family favorite'],
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'lbs', category: 'Meat & Seafood' },
      { name: 'Breadcrumbs', quantity: 1, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Mozzarella cheese', quantity: 8, unit: 'oz', category: 'Dairy & Eggs' },
      { name: 'Marinara sauce', quantity: 2, unit: 'cups', category: 'Pantry/Dry Goods' },
      { name: 'Eggs', quantity: 2, unit: 'large', category: 'Dairy & Eggs' },
      { name: 'Olive oil', quantity: 0.25, unit: 'cup', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'beef-tacos',
    name: 'Ground Beef Tacos',
    cuisine: 'Mexican',
    protein: 'Beef',
    prepTime: 25,
    difficulty: 'Beginner',
    tags: ['quick', 'family friendly'],
    ingredients: [
      { name: 'Ground beef', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Soft tortillas', quantity: 8, unit: 'pieces', category: 'Bakery' },
      { name: 'Lettuce', quantity: 1, unit: 'head', category: 'Produce' },
      { name: 'Tomatoes', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Cheddar cheese', quantity: 8, unit: 'oz', category: 'Dairy & Eggs' },
      { name: 'Taco seasoning', quantity: 1, unit: 'packet', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'teriyaki-salmon',
    name: 'Teriyaki Salmon',
    cuisine: 'Asian',
    protein: 'Fish',
    prepTime: 30,
    difficulty: 'Intermediate',
    tags: ['healthy', 'gluten-free option'],
    ingredients: [
      { name: 'Salmon fillets', quantity: 4, unit: 'pieces', category: 'Meat & Seafood' },
      { name: 'Soy sauce', quantity: 0.25, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Brown sugar', quantity: 2, unit: 'tbsp', category: 'Pantry/Dry Goods' },
      { name: 'Rice vinegar', quantity: 1, unit: 'tbsp', category: 'Pantry/Dry Goods' },
      { name: 'Jasmine rice', quantity: 1, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Green onions', quantity: 3, unit: 'stalks', category: 'Produce' }
    ]
  },
  {
    id: 'greek-chicken',
    name: 'Greek Lemon Chicken',
    cuisine: 'Mediterranean',
    protein: 'Chicken',
    prepTime: 40,
    difficulty: 'Intermediate',
    tags: ['healthy', 'one pan'],
    ingredients: [
      { name: 'Chicken thighs', quantity: 2, unit: 'lbs', category: 'Meat & Seafood' },
      { name: 'Lemons', quantity: 2, unit: 'large', category: 'Produce' },
      { name: 'Olive oil', quantity: 0.33, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Red onion', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Bell peppers', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Feta cheese', quantity: 4, unit: 'oz', category: 'Dairy & Eggs' }
    ]
  },
  {
    id: 'vegetable-stir-fry',
    name: 'Vegetable Stir Fry',
    cuisine: 'Asian',
    protein: 'Vegetarian',
    prepTime: 20,
    difficulty: 'Beginner',
    tags: ['vegetarian', 'vegan', 'quick'],
    ingredients: [
      { name: 'Broccoli', quantity: 2, unit: 'cups', category: 'Produce' },
      { name: 'Carrots', quantity: 2, unit: 'large', category: 'Produce' },
      { name: 'Bell peppers', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Snap peas', quantity: 1, unit: 'cup', category: 'Produce' },
      { name: 'Soy sauce', quantity: 3, unit: 'tbsp', category: 'Pantry/Dry Goods' },
      { name: 'Sesame oil', quantity: 1, unit: 'tbsp', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'pork-chops',
    name: 'Honey Garlic Pork Chops',
    cuisine: 'American',
    protein: 'Pork',
    prepTime: 35,
    difficulty: 'Intermediate',
    tags: ['comfort food', 'hearty'],
    ingredients: [
      { name: 'Pork chops', quantity: 4, unit: 'thick cut', category: 'Meat & Seafood' },
      { name: 'Honey', quantity: 0.25, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Garlic', quantity: 4, unit: 'cloves', category: 'Produce' },
      { name: 'Potatoes', quantity: 2, unit: 'lbs', category: 'Produce' },
      { name: 'Butter', quantity: 4, unit: 'tbsp', category: 'Dairy & Eggs' },
      { name: 'Fresh thyme', quantity: 2, unit: 'sprigs', category: 'Produce' }
    ]
  },
  {
    id: 'pasta-primavera',
    name: 'Pasta Primavera',
    cuisine: 'Italian',
    protein: 'Vegetarian',
    prepTime: 25,
    difficulty: 'Beginner',
    tags: ['vegetarian', 'seasonal'],
    ingredients: [
      { name: 'Penne pasta', quantity: 1, unit: 'lb', category: 'Pantry/Dry Goods' },
      { name: 'Zucchini', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Cherry tomatoes', quantity: 1, unit: 'pint', category: 'Produce' },
      { name: 'Heavy cream', quantity: 1, unit: 'cup', category: 'Dairy & Eggs' },
      { name: 'Parmesan cheese', quantity: 1, unit: 'cup', category: 'Dairy & Eggs' },
      { name: 'Fresh basil', quantity: 0.25, unit: 'cup', category: 'Produce' }
    ]
  },
  {
    id: 'fish-tacos',
    name: 'Baja Fish Tacos',
    cuisine: 'Mexican',
    protein: 'Fish',
    prepTime: 30,
    difficulty: 'Intermediate',
    tags: ['healthy', 'coastal'],
    ingredients: [
      { name: 'White fish fillets', quantity: 1.5, unit: 'lbs', category: 'Meat & Seafood' },
      { name: 'Corn tortillas', quantity: 8, unit: 'pieces', category: 'Bakery' },
      { name: 'Cabbage', quantity: 0.5, unit: 'head', category: 'Produce' },
      { name: 'Limes', quantity: 3, unit: 'medium', category: 'Produce' },
      { name: 'Sour cream', quantity: 0.5, unit: 'cup', category: 'Dairy & Eggs' },
      { name: 'Cilantro', quantity: 0.5, unit: 'cup', category: 'Produce' }
    ]
  },
  {
    id: 'beef-stir-fry',
    name: 'Mongolian Beef',
    cuisine: 'Asian',
    protein: 'Beef',
    prepTime: 25,
    difficulty: 'Intermediate',
    tags: ['takeout favorite', 'quick'],
    ingredients: [
      { name: 'Beef sirloin', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Soy sauce', quantity: 0.33, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Brown sugar', quantity: 3, unit: 'tbsp', category: 'Pantry/Dry Goods' },
      { name: 'Green onions', quantity: 4, unit: 'stalks', category: 'Produce' },
      { name: 'Bell peppers', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp', category: 'Produce' }
    ]
  },
  {
    id: 'chicken-curry',
    name: 'Thai Green Curry Chicken',
    cuisine: 'Asian',
    protein: 'Chicken',
    prepTime: 35,
    difficulty: 'Intermediate',
    tags: ['spicy', 'aromatic'],
    ingredients: [
      { name: 'Chicken thighs', quantity: 1.5, unit: 'lbs', category: 'Meat & Seafood' },
      { name: 'Coconut milk', quantity: 1, unit: 'can', category: 'Pantry/Dry Goods' },
      { name: 'Green curry paste', quantity: 2, unit: 'tbsp', category: 'Pantry/Dry Goods' },
      { name: 'Thai basil', quantity: 0.25, unit: 'cup', category: 'Produce' },
      { name: 'Bamboo shoots', quantity: 1, unit: 'can', category: 'Pantry/Dry Goods' },
      { name: 'Thai eggplant', quantity: 4, unit: 'small', category: 'Produce' }
    ]
  },
  {
    id: 'shepherd-pie',
    name: 'Shepherd\'s Pie',
    cuisine: 'British',
    protein: 'Beef',
    prepTime: 60,
    difficulty: 'Intermediate',
    tags: ['comfort food', 'hearty'],
    ingredients: [
      { name: 'Ground lamb', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Potatoes', quantity: 3, unit: 'lbs', category: 'Produce' },
      { name: 'Carrots', quantity: 3, unit: 'medium', category: 'Produce' },
      { name: 'Peas', quantity: 1, unit: 'cup', category: 'Frozen' },
      { name: 'Butter', quantity: 4, unit: 'tbsp', category: 'Dairy & Eggs' },
      { name: 'Worcestershire sauce', quantity: 2, unit: 'tbsp', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'chicken-tikka',
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    protein: 'Chicken',
    prepTime: 45,
    difficulty: 'Intermediate',
    tags: ['spicy', 'creamy'],
    ingredients: [
      { name: 'Chicken breast', quantity: 2, unit: 'lbs', category: 'Meat & Seafood' },
      { name: 'Basmati rice', quantity: 1, unit: 'cup', category: 'Pantry/Dry Goods' },
      { name: 'Tomato sauce', quantity: 1, unit: 'can', category: 'Pantry/Dry Goods' },
      { name: 'Heavy cream', quantity: 1, unit: 'cup', category: 'Dairy & Eggs' },
      { name: 'Garam masala', quantity: 2, unit: 'tsp', category: 'Pantry/Dry Goods' },
      { name: 'Ginger', quantity: 1, unit: 'tbsp', category: 'Produce' }
    ]
  },
  {
    id: 'paella',
    name: 'Seafood Paella',
    cuisine: 'Spanish',
    protein: 'Fish',
    prepTime: 50,
    difficulty: 'Advanced',
    tags: ['special occasion', 'seafood'],
    ingredients: [
      { name: 'Shrimp', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Mussels', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Arborio rice', quantity: 2, unit: 'cups', category: 'Pantry/Dry Goods' },
      { name: 'Saffron', quantity: 1, unit: 'pinch', category: 'Pantry/Dry Goods' },
      { name: 'Bell peppers', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Chicken stock', quantity: 4, unit: 'cups', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'ratatouille',
    name: 'Ratatouille',
    cuisine: 'French',
    protein: 'Vegetarian',
    prepTime: 50,
    difficulty: 'Intermediate',
    tags: ['vegetarian', 'rustic'],
    ingredients: [
      { name: 'Eggplant', quantity: 1, unit: 'large', category: 'Produce' },
      { name: 'Zucchini', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Tomatoes', quantity: 4, unit: 'large', category: 'Produce' },
      { name: 'Bell peppers', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Herbs de Provence', quantity: 2, unit: 'tsp', category: 'Pantry/Dry Goods' },
      { name: 'Olive oil', quantity: 0.33, unit: 'cup', category: 'Pantry/Dry Goods' }
    ]
  },
  {
    id: 'sushi-bowl',
    name: 'Salmon Sushi Bowl',
    cuisine: 'Japanese',
    protein: 'Fish',
    prepTime: 25,
    difficulty: 'Beginner',
    tags: ['healthy', 'fresh'],
    ingredients: [
      { name: 'Sushi-grade salmon', quantity: 1, unit: 'lb', category: 'Meat & Seafood' },
      { name: 'Sushi rice', quantity: 2, unit: 'cups', category: 'Pantry/Dry Goods' },
      { name: 'Cucumber', quantity: 1, unit: 'medium', category: 'Produce' },
      { name: 'Avocado', quantity: 2, unit: 'medium', category: 'Produce' },
      { name: 'Nori sheets', quantity: 4, unit: 'sheets', category: 'Pantry/Dry Goods' },
      { name: 'Soy sauce', quantity: 0.25, unit: 'cup', category: 'Pantry/Dry Goods' }
    ]
  }
];