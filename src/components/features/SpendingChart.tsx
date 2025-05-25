
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Expense {
  id: number;
  amount: number;
  category: string;
  categoryColor: string;
}

interface SpendingChartProps {
  expenses: Expense[];
}

const SpendingChart = ({ expenses }: SpendingChartProps) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({
        name: expense.category,
        value: expense.amount,
        color: expense.categoryColor
      });
    }
    return acc;
  }, [] as { name: string; value: number; color: string }[]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h3>
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingChart;
