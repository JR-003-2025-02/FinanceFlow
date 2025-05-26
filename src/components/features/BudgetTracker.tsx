
import { useState, useEffect } from 'react';
import { Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { useExpenses, type Expense } from '@/hooks/useExpenses';

interface Budget {
  id: string;
  category: string;
  amount: number;
  period: 'monthly' | 'weekly' | 'yearly';
  spent: number;
}

const BudgetTracker = () => {
  const { expenses } = useExpenses();
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: '1', category: 'Food & Dining', amount: 500, period: 'monthly', spent: 0 },
    { id: '2', category: 'Transportation', amount: 200, period: 'monthly', spent: 0 },
    { id: '3', category: 'Entertainment', amount: 150, period: 'monthly', spent: 0 },
  ]);

  useEffect(() => {
    // Calculate spent amounts for each budget based on current month expenses
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const updatedBudgets = budgets.map(budget => {
      const categoryExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expense.category === budget.category &&
               expenseDate.getMonth() === currentMonth &&
               expenseDate.getFullYear() === currentYear;
      });
      
      const spent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      return { ...budget, spent };
    });
    
    setBudgets(updatedBudgets);
  }, [expenses]);

  const getProgressColor = (percentage: number) => {
    if (percentage < 50) return 'from-green-400 to-green-500';
    if (percentage < 80) return 'from-yellow-400 to-yellow-500';
    return 'from-red-400 to-red-500';
  };

  const getStatusIcon = (percentage: number) => {
    if (percentage < 80) return <TrendingUp className="text-green-500" size={16} />;
    if (percentage < 100) return <AlertTriangle className="text-yellow-500" size={16} />;
    return <AlertTriangle className="text-red-500" size={16} />;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Budget Overview</h3>
      </div>
      
      <div className="space-y-4">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.amount) * 100;
          const remaining = budget.amount - budget.spent;
          
          return (
            <div key={budget.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(percentage)}
                  <h4 className="font-semibold text-gray-900">{budget.category}</h4>
                </div>
                <span className="text-sm text-gray-600 capitalize">{budget.period}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    ${budget.spent.toFixed(2)} of ${budget.amount.toFixed(2)}
                  </span>
                  <span className={`font-medium ${
                    percentage > 100 ? 'text-red-500' : 'text-gray-900'
                  }`}>
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getProgressColor(percentage)} transition-all duration-300`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className={remaining >= 0 ? 'text-green-600' : 'text-red-500'}>
                    {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over budget`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
