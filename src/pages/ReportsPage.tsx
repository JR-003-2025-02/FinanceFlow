
import MainLayout from '../layouts/MainLayout';
import SpendingChart from '../components/features/SpendingChart';
import AnalyticsDashboard from '../components/features/AnalyticsDashboard';

const ReportsPage = () => {
  const expenses = [
    {
      id: 1,
      amount: 45.50,
      category: 'Food & Dining',
      description: 'Lunch at cafe',
      date: '2024-05-25',
      categoryColor: '#ef4444'
    },
    {
      id: 2,
      amount: 120.00,
      category: 'Transportation',
      description: 'Gas station',
      date: '2024-05-24',
      categoryColor: '#3b82f6'
    },
    {
      id: 3,
      amount: 89.99,
      category: 'Shopping',
      description: 'Online purchase',
      date: '2024-05-23',
      categoryColor: '#8b5cf6'
    },
    {
      id: 4,
      amount: 1200.00,
      category: 'Housing',
      description: 'Monthly rent',
      date: '2024-05-01',
      categoryColor: '#f59e0b'
    }
  ];

  const analyticsData = {
    monthlyTrends: [
      { month: 'Jan', amount: 1200, budget: 1500 },
      { month: 'Feb', amount: 1350, budget: 1500 },
      { month: 'Mar', amount: 1100, budget: 1500 },
      { month: 'Apr', amount: 1600, budget: 1500 },
      { month: 'May', amount: 1455, budget: 1500 },
      { month: 'Jun', amount: 1320, budget: 1500 },
    ],
    categoryBreakdown: [
      { category: 'Housing', amount: 1200, percentage: 45.5, color: '#f59e0b' },
      { category: 'Food & Dining', amount: 450, percentage: 17.1, color: '#ef4444' },
      { category: 'Transportation', amount: 320, percentage: 12.1, color: '#3b82f6' },
      { category: 'Shopping', amount: 280, percentage: 10.6, color: '#8b5cf6' },
      { category: 'Entertainment', amount: 180, percentage: 6.8, color: '#10b981' },
      { category: 'Others', amount: 205, percentage: 7.9, color: '#6b7280' },
    ],
    weeklySpending: [
      { week: 'Week 1', amount: 320 },
      { week: 'Week 2', amount: 450 },
      { week: 'Week 3', amount: 380 },
      { week: 'Week 4', amount: 305 },
    ],
    topExpenses: [
      { description: 'Monthly rent', amount: 1200, category: 'Housing', date: '2024-05-01' },
      { description: 'Gas station', amount: 120, category: 'Transportation', date: '2024-05-24' },
      { description: 'Online purchase', amount: 89.99, category: 'Shopping', date: '2024-05-23' },
      { description: 'Grocery shopping', amount: 65.75, category: 'Food & Dining', date: '2024-05-20' },
      { description: 'Lunch at cafe', amount: 45.50, category: 'Food & Dining', date: '2024-05-25' },
    ]
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Insights into your spending patterns
          </p>
        </div>

        <AnalyticsDashboard data={analyticsData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingChart expenses={expenses} />
          
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Trends</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">This Month</span>
                <span className="font-bold text-gray-900 dark:text-white">$1,455.49</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-600 dark:text-gray-400">Last Month</span>
                <span className="font-bold text-gray-900 dark:text-white">$1,320.75</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <span className="text-green-600 dark:text-green-400">Difference</span>
                <span className="font-bold text-green-600 dark:text-green-400">+$134.74</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
