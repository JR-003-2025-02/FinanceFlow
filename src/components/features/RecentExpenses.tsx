
interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
  categoryColor: string;
}

interface RecentExpensesProps {
  expenses: Expense[];
}

const RecentExpenses = ({ expenses }: RecentExpensesProps) => {
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Expenses</h3>
      <div className="space-y-4">
        {recentExpenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: expense.categoryColor + '20' }}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: expense.categoryColor }}
                ></div>
              </div>
              <div>
                <p className="font-medium text-gray-900">{expense.description}</p>
                <p className="text-sm text-gray-600">{expense.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{expense.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentExpenses;
