
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

interface AnalyticsData {
  monthlyTrends: { month: string; amount: number; budget: number }[];
  categoryBreakdown: { category: string; amount: number; percentage: number; color: string }[];
  weeklySpending: { week: string; amount: number }[];
  topExpenses: { description: string; amount: number; category: string; date: string }[];
}

interface AnalyticsDashboardProps {
  data: AnalyticsData;
}

const AnalyticsDashboard = ({ data }: AnalyticsDashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Monthly Trends */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Monthly Spending Trends</h3>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <AreaChart data={data.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
              <YAxis className="text-gray-600 dark:text-gray-400" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                fill="url(#colorSpending)" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#ef4444" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <defs>
                <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Spending Pattern */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Spending Pattern</h3>
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <BarChart data={data.weeklySpending}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="week" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Expenses */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Top Expenses This Month</h3>
          <div className="space-y-3">
            {data.topExpenses.map((expense, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{expense.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{expense.category} • {expense.date}</p>
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Category Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categoryBreakdown.map((category) => (
            <div key={category.category} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium text-gray-900 dark:text-white">{category.category}</span>
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {category.percentage.toFixed(1)}%
                </span>
              </div>
              <div className="mb-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ${category.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
