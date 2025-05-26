
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Pie as PieIcon, DollarSign } from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useMemo } from 'react';

const CategoryInsights = () => {
  const { expenses } = useExpenses();

  const categoryData = useMemo(() => {
    const categoryTotals = expenses.reduce((acc, expense) => {
      const existing = acc.find(item => item.name === expense.category);
      if (existing) {
        existing.value += expense.amount;
      } else {
        acc.push({
          name: expense.category,
          value: expense.amount,
          color: expense.category_color,
          count: 1
        });
      }
      return acc;
    }, [] as { name: string; value: number; color: string; count: number }[]);

    // Calculate percentages
    const total = categoryTotals.reduce((sum, item) => sum + item.value, 0);
    return categoryTotals.map(item => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0
    })).sort((a, b) => b.value - a.value);
  }, [expenses]);

  const totalSpent = categoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center space-x-2 mb-6">
        <PieIcon className="text-purple-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Category Insights</h3>
      </div>

      {categoryData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div style={{ width: '100%', height: '250px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percentage }) => `${percentage.toFixed(1)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">Category Breakdown</h4>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <DollarSign size={14} />
                <span>Total: ${totalSpent.toFixed(2)}</span>
              </div>
            </div>
            
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-600">{category.count} expenses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${category.value.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{category.percentage.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <PieIcon className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">No expenses to analyze yet</p>
          <p className="text-sm text-gray-500">Add some expenses to see category insights</p>
        </div>
      )}
    </div>
  );
};

export default CategoryInsights;
