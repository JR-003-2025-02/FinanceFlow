
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/expenses/add"
          className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="text-3xl mb-2">➕</span>
          <span className="font-semibold">Add Expense</span>
        </Link>
        
        <Link 
          to="/reports"
          className="flex flex-col items-center p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="text-3xl mb-2">📊</span>
          <span className="font-semibold">View Reports</span>
        </Link>
        
        <Link 
          to="/expenses"
          className="flex flex-col items-center p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <span className="text-3xl mb-2">📋</span>
          <span className="font-semibold">All Expenses</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
