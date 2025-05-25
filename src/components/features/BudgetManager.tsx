
import { useState } from 'react';
import { Plus, Edit, Trash2, Target } from 'lucide-react';

interface Budget {
  id: string;
  category: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

interface BudgetManagerProps {
  budgets: Budget[];
  categories: string[];
  onAddBudget: (budget: Omit<Budget, 'id' | 'spent'>) => void;
  onEditBudget: (id: string, budget: Partial<Budget>) => void;
  onDeleteBudget: (id: string) => void;
}

const BudgetManager = ({ budgets, categories, onAddBudget, onEditBudget, onDeleteBudget }: BudgetManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: 0,
    period: 'monthly' as const
  });

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.amount > 0) {
      onAddBudget(newBudget);
      setNewBudget({ category: '', amount: 0, period: 'monthly' });
      setIsAdding(false);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-green-400 to-green-500';
    if (percentage < 80) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Budget Management</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus size={16} />
          <span>Set Budget</span>
        </button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          return (
            <div
              key={budget.id}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Target size={20} className="text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {budget.category}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {budget.period} budget
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onDeleteBudget(budget.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                  </span>
                  <span className={`font-medium ${
                    percentage > 100 ? 'text-red-500' : 'text-gray-900 dark:text-white'
                  }`}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(percentage)} transition-all duration-300`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                {percentage > 100 && (
                  <p className="text-sm text-red-500 font-medium">
                    Over budget by ${(budget.spent - budget.amount).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {isAdding && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Budget Amount
                </label>
                <input
                  type="number"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget({ ...newBudget, amount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value as 'monthly' | 'weekly' | 'yearly' })}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleAddBudget}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Set Budget
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManager;
