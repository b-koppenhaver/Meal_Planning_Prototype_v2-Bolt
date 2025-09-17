import { User } from '../types';

export const sampleUser: User = {
  id: 'user-1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  dietaryRestrictions: [],
  cuisinePreferences: ['Italian', 'Mediterranean', 'Mexican', 'Asian'],
  foodDislikes: ['Brussels sprouts', 'liver', 'overly spicy food'],
  prepTimePreference: '30-45 minutes',
  cookingLevel: 'Intermediate',
  ratings: {
    'chicken-parmesan': 5,
    'beef-tacos': 4,
    'teriyaki-salmon': 2,
    'greek-chicken': 5,
    'vegetable-stir-fry': 3,
    'pork-chops': 4,
    'pasta-primavera': 5,
    'fish-tacos': 2,
    'beef-stir-fry': 4,
    'chicken-curry': 3
  }
};