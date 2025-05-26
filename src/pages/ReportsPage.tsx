
import MainLayout from '../layouts/MainLayout';
import SpendingTrends from '../components/features/SpendingTrends';
import CategoryInsights from '../components/features/CategoryInsights';
import AnalyticsDashboard from '../components/features/AnalyticsDashboard';
import BudgetTracker from '../components/features/BudgetTracker';
import { useExpenses } from '../hooks/useExpenses';
import { useEffect } from 'react';

const ReportsPage = () => {
  const { expenses, loading, fetchExpenses } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Transform expenses for analytics dashboard
  const analyticsData = {
    monthlyTrends: [
      { month: 'Jan', amount: 1200, budget: 1500 },
      { month: 'Feb', amount: 1350, budget: 1500 },
      { month: 'Mar', amount: 1100, budget: 1500 },
      { month: 'Apr', amount: 1600, budget: 1500 },
      { month: 'May', amount: 1455, budget: 1500 },
      { month: 'Jun', amount: 1320, budget: 1500 },
    ],
    categoryBreakdown: expenses.reduce((acc, expense) => {
      const existing = acc.find(item => item.category === expense.category);
      if (existing) {
        existing.amount += expense.amount;
      } else {
        acc.push({
          category: expense.category,
          amount: expense.amount,
          percentage: 0,
          color: expense.category_color
        });
      }
      return acc;
    }, [] as { category: string; amount: number; percentage: number; color: string }[])
    .map(item => {
      const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
      return {
        ...item,
        percentage: total > 0 ? (item.amount / total) * 100 : 0
      };
    }),
    weeklySpending: [
      { week: 'Week 1', amount: 320 },
      { week: 'Week 2', amount: 450 },
      { week: 'Week 3', amount: 380 },
      { week: 'Week 4', amount: 305 },
    ],
    topExpenses: expenses
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
      .map(expense => ({
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        date: expense.date
      }))
  };

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
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Deep insights into your spending patterns and financial trends
          </p>
        </div>

        {/* Enhanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingTrends />
          <CategoryInsights />
        </div>

        <BudgetTracker />

        <AnalyticsDashboard data={analyticsData} />
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
