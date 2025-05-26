
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CustomCategoryManager from '../components/features/CustomCategoryManager';
import BudgetManager from '../components/features/BudgetManager';
import UserProfile from '../components/features/UserProfile';

const SettingsPage = () => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Food & Dining', color: '#ef4444' },
    { id: '2', name: 'Transportation', color: '#3b82f6' },
    { id: '3', name: 'Shopping', color: '#8b5cf6' },
    { id: '4', name: 'Housing', color: '#f59e0b' },
    { id: '5', name: 'Entertainment', color: '#10b981' },
    { id: '6', name: 'Healthcare', color: '#f97316' },
    { id: '7', name: 'Utilities', color: '#84cc16' },
    { id: '8', name: 'Other', color: '#6b7280' }
  ]);
  
  const [budgets, setBudgets] = useState([]);

  const handleAddCategory = (category: Omit<any, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (id: string, updates: Partial<any>) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddBudget = (budget: Omit<any, 'id' | 'spent'>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets([...budgets, newBudget]);
  };

  const handleEditBudget = (id: string, updates: Partial<any>) => {
    setBudgets(budgets.map(budget => 
      budget.id === id ? { ...budget, ...updates } : budget
    ));
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Settings & Preferences
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your expense tracking experience
          </p>
        </div>

        <UserProfile userName="John Doe" />

        <CustomCategoryManager
          categories={categories}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        <BudgetManager
          budgets={budgets}
          categories={categories.map(c => c.name)}
          onAddBudget={handleAddBudget}
          onEditBudget={handleEditBudget}
          onDeleteBudget={handleDeleteBudget}
        />

        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Save All Settings
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
