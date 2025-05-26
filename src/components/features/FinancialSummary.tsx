
import { Calendar, TrendingDown, TrendingUp, Target } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useMemo } from 'react';

const FinancialSummary = () => {
  const { expenses } = useExpenses();

  const summary = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Current month expenses
    const currentMonthExpenses = expenses.filter(expense => {
      const date = new Date(expense.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    // Last month expenses
    const lastMonthExpenses = expenses.filter(expense => {
      const date = new Date(expense.date);
      return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
    });

    // This week expenses (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const thisWeekExpenses = expenses.filter(expense => {
      const date = new Date(expense.date);
      return date >= weekAgo;
    });

    const currentMonthTotal = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const thisWeekTotal = thisWeekExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalAllTime = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Calculate month-over-month change
    const monthlyChange = lastMonthTotal > 0 
      ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 
      : 0;

    // Average daily spending this month
    const daysInMonth = now.getDate();
    const avgDailySpending = daysInMonth > 0 ? currentMonthTotal / daysInMonth : 0;

    return {
      currentMonthTotal,
      lastMonthTotal,
      thisWeekTotal,
      totalAllTime,
      monthlyChange,
      avgDailySpending,
      expenseCount: currentMonthExpenses.length
    };
  }, [expenses]);

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* This Month */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">This Month</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.currentMonthTotal)}</p>
            <p className="text-sm text-gray-500">{summary.expenseCount} expenses</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <Calendar className="text-white" size={20} />
          </div>
        </div>
      </div>

      {/* Monthly Change */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">vs Last Month</p>
            <p className={`text-2xl font-bold ${
              summary.monthlyChange > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {summary.monthlyChange > 0 ? '+' : ''}{summary.monthlyChange.toFixed(1)}%
            </p>
            <p className="text-sm text-gray-500">{formatCurrency(summary.lastMonthTotal)} last month</p>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            summary.monthlyChange > 0 
              ? 'bg-gradient-to-r from-red-400 to-red-600' 
              : 'bg-gradient-to-r from-green-400 to-green-600'
          }`}>
            {summary.monthlyChange > 0 ? (
              <TrendingUp className="text-white" size={20} />
            ) : (
              <TrendingDown className="text-white" size={20} />
            )}
          </div>
        </div>
      </div>

      {/* This Week */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">This Week</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.thisWeekTotal)}</p>
            <p className="text-sm text-gray-500">Last 7 days</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Calendar className="text-white" size={20} />
          </div>
        </div>
      </div>

      {/* Daily Average */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Daily Average</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.avgDailySpending)}</p>
            <p className="text-sm text-gray-500">This month</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
            <Target className="text-white" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
