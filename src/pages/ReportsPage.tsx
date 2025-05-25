
import MainLayout from '../layouts/MainLayout';
import SpendingChart from '../components/features/SpendingChart';

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

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Insights into your spending patterns
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpendingChart expenses={expenses} />
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Trends</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">This Month</span>
                <span className="font-bold text-gray-900">$1,455.49</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Last Month</span>
                <span className="font-bold text-gray-900">$1,320.75</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                <span className="text-green-600">Difference</span>
                <span className="font-bold text-green-600">+$134.74</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
