import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GroceryList from './components/GroceryList';
import Profile from './components/Profile';
import { User, MealPlan } from './types';
import { sampleUser } from './data/sampleUser';
import { MealPlanGenerator } from './utils/mealPlanning';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState<User>(sampleUser);
  const [mealPlan, setMealPlan] = useState<MealPlan[]>([]);

  useEffect(() => {
    // Generate initial meal plan
    const startDate = new Date();
    const initialPlan = MealPlanGenerator.generateMealPlan(user, startDate);
    setMealPlan(initialPlan);
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    // In a real app, this would save to backend/localStorage
  };

  const handleUpdateMealPlan = (newPlan: MealPlan[]) => {
    setMealPlan(newPlan);
    // In a real app, this would save to backend/localStorage
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            mealPlan={mealPlan}
            user={user}
            onUpdateMealPlan={handleUpdateMealPlan}
            onUpdateUser={handleUpdateUser}
          />
        );
      case 'grocery':
        return <GroceryList mealPlan={mealPlan} />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return (
          <Dashboard
            mealPlan={mealPlan}
            user={user}
            onUpdateMealPlan={handleUpdateMealPlan}
            onUpdateUser={handleUpdateUser}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        userName={user.name}
      />
      <main>{renderCurrentView()}</main>
    </div>
  );
}

export default App;