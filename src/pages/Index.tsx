
import { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import DashboardStats from '../components/features/DashboardStats';
import RecentExpenses from '../components/features/RecentExpenses';
import SpendingChart from '../components/features/SpendingChart';
import QuickActions from '../components/features/QuickActions';
import BudgetTracker from '../components/features/BudgetTracker';
import FinancialSummary from '../components/features/FinancialSummary';
import ProgressIndicator from '../components/features/ProgressIndicator';
import OnboardingTour from '../components/features/OnboardingTour';
import { useExpenses } from '../hooks/useExpenses';

const Index = () => {
  const { expenses, loading, fetchExpenses } = useExpenses();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [stats, setStats] = useState({
    totalSpent: 0,
    monthlyBudget: 3000,
    budgetUsed: 0,
    expenseCount: 0
  });

  useEffect(() => {
    fetchExpenses();
    
    // Check if user is new (no expenses) and should see onboarding
    const hasSeenOnboarding = localStorage.getItem('financeflow-onboarding-complete');
    if (!hasSeenOnboarding && expenses.length === 0) {
      setShowOnboarding(true);
    }
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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('financeflow-onboarding-complete', 'true');
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
      {showOnboarding && (
        <OnboardingTour onComplete={handleOnboardingComplete} />
      )}
      
      <div className="space-y-8">
        {/* Header with Progress Indicator */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to FinanceFlow
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your smart financial companion for effortless expense tracking
          </p>
          <ProgressIndicator 
            currentExpenses={stats.expenseCount}
            currentBudgetUsage={stats.budgetUsed}
            totalSpent={stats.totalSpent}
          />
        </div>

        {/* Financial Summary */}
        <FinancialSummary />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Budget */}
          <div className="lg:col-span-2 space-y-8">
            {expenses.length > 0 ? (
              <SpendingChart expenses={expenses} />
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Start Your Financial Journey</h3>
                <p className="text-gray-600 mb-4">Add your first expense to see spending insights</p>
                <div className="text-6xl mb-4">📊</div>
              </div>
            )}
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
