
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import CategoryManager from '../components/features/CategoryManager';
import BudgetManager from '../components/features/BudgetManager';

const SettingsPage = () => {
  const [categories, setCategories] = useState([
    { id: '1', name: 'Food & Dining', color: '#ef4444', isCustom: false },
    { id: '2', name: 'Transportation', color: '#3b82f6', isCustom: false },
    { id: '3', name: 'Shopping', color: '#8b5cf6', isCustom: false },
    { id: '4', name: 'Housing', color: '#f59e0b', isCustom: false },
    { id: '5', name: 'Entertainment', color: '#10b981', isCustom: true },
  ]);

  const [budgets, setBudgets] = useState([
    { id: '1', category: 'Food & Dining', amount: 500, spent: 320, period: 'monthly' as const },
    { id: '2', category: 'Transportation', amount: 200, spent: 145, period: 'monthly' as const },
    { id: '3', category: 'Shopping', amount: 300, spent: 380, period: 'monthly' as const },
  ]);

  const handleAddCategory = (category: Omit<typeof categories[0], 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories([...categories, newCategory]);
  };

  const handleEditCategory = (id: string, updates: Partial<typeof categories[0]>) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleAddBudget = (budget: Omit<typeof budgets[0], 'id' | 'spent'>) => {
    const newBudget = {
      ...budget,
      id: Date.now().toString(),
      spent: 0,
    };
    setBudgets([...budgets, newBudget]);
  };

  const handleEditBudget = (id: string, updates: Partial<typeof budgets[0]>) => {
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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Currency</label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Monthly Budget</label>
                <input
                  type="number"
                  defaultValue="3000"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <CategoryManager
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

        {/* Save Button */}
        <div className="text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Save Changes
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
