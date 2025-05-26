
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardStats from '../components/features/DashboardStats';
import RecentExpenses from '../components/features/RecentExpenses';
import SpendingChart from '../components/features/SpendingChart';
import QuickActions from '../components/features/QuickActions';

const Index = () => {
  const [expenses] = useState([
    {
      id: '1',
      amount: 45.50,
      category: 'Food & Dining',
      description: 'Lunch at cafe',
      date: '2024-05-25',
      category_color: '#ef4444'
    },
    {
      id: '2',
      amount: 120.00,
      category: 'Transportation',
      description: 'Gas station',
      date: '2024-05-24',
      category_color: '#3b82f6'
    },
    {
      id: '3',
      amount: 89.99,
      category: 'Shopping',
      description: 'Online purchase',
      date: '2024-05-23',
      category_color: '#8b5cf6'
    },
    {
      id: '4',
      amount: 1200.00,
      category: 'Housing',
      description: 'Monthly rent',
      date: '2024-05-01',
      category_color: '#f59e0b'
    }
  ]);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBudget = 3000;
  const budgetUsed = (totalSpent / monthlyBudget) * 100;

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-gray-600">
            Track your spending, manage your budget, and achieve your financial goals
          </p>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats 
          totalSpent={totalSpent}
          monthlyBudget={monthlyBudget}
          budgetUsed={budgetUsed}
          expenseCount={expenses.length}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart and Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            <SpendingChart expenses={expenses} />
            <QuickActions />
          </div>

          {/* Right Column - Recent Expenses */}
          <div className="lg:col-span-1">
            <RecentExpenses expenses={expenses} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
