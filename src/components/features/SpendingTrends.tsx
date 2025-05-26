
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useState } from 'react';

const SpendingTrends = () => {
  const { expenses } = useExpenses();
  const [viewType, setViewType] = useState<'daily' | 'monthly'>('monthly');

  // Generate monthly spending data
  const getMonthlyData = () => {
    const monthlyData: { [key: string]: number } = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + expense.amount;
    });

    return Object.entries(monthlyData)
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        amount: Number(amount.toFixed(2))
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6); // Last 6 months
  };

  // Generate daily spending data for current month
  const getDailyData = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const dailyData: { [key: string]: number } = {};
    
    expenses
      .filter(expense => {
        const date = new Date(expense.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      })
      .forEach(expense => {
        const dayKey = new Date(expense.date).getDate();
        dailyData[dayKey] = (dailyData[dayKey] || 0) + expense.amount;
      });

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const result = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      result.push({
        day: day.toString(),
        amount: Number((dailyData[day] || 0).toFixed(2))
      });
    }
    
    return result.slice(0, 15); // Show first 15 days to keep chart readable
  };

  const data = viewType === 'monthly' ? getMonthlyData() : getDailyData();
  const dataKey = viewType === 'monthly' ? 'month' : 'day';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Spending Trends</h3>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewType('daily')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              viewType === 'daily' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setViewType('monthly')}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              viewType === 'monthly' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          {viewType === 'monthly' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey={dataKey} className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey={dataKey} className="text-gray-600" />
              <YAxis className="text-gray-600" />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Amount']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingTrends;
