
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardStats from '../components/features/DashboardStats';
import RecentExpenses from '../components/features/RecentExpenses';
import SpendingChart from '../components/features/SpendingChart';
import QuickActions from '../components/features/QuickActions';
import BudgetTracker from '../components/features/BudgetTracker';
import FinancialSummary from '../components/features/FinancialSummary';
import { useExpenses, type Expense } from '../hooks/useExpenses';

const Index = () => {
  const { expenses, loading, fetchExpenses } = useExpenses();
  const [stats, setStats] = useState({
    totalSpent: 0,
    monthlyBudget: 3000,
    budgetUsed: 0,
    expenseCount: 0
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
      const monthlyBudget = 3000; // This could be user-configurable later
      const budgetUsed = (totalSpent / monthlyBudget) * 100;
      
      setStats({
        totalSpent,
        monthlyBudget,
        budgetUsed,
        expenseCount: expenses.length
      });
    }
  }, [expenses]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Financial Dashboard
          </h1>
          <p className="text-gray-600">
            Track your spending, manage your budget, and achieve your financial goals
          </p>
        </div>

        {/* Financial Summary */}
        <FinancialSummary />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Budget */}
          <div className="lg:col-span-2 space-y-8">
            <SpendingChart expenses={expenses} />
            <BudgetTracker />
          </div>

          {/* Right Column - Recent Expenses and Quick Actions */}
          <div className="lg:col-span-1 space-y-8">
            <RecentExpenses expenses={expenses} />
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
