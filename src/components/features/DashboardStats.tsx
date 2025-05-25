
interface DashboardStatsProps {
  totalSpent: number;
  monthlyBudget: number;
  budgetUsed: number;
  expenseCount: number;
}

const DashboardStats = ({ totalSpent, monthlyBudget, budgetUsed, expenseCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Spent */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Spent</p>
            <p className="text-3xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">💸</span>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-600 text-sm font-medium">Budget Used</p>
            <p className="text-3xl font-bold text-gray-900">{budgetUsed.toFixed(1)}%</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📊</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(budgetUsed, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Expense Count */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-900">{expenseCount}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl">📝</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
