import { useAuth } from '@/contexts/AuthContext';

interface UserProfileProps {
  userName: string;
}

const UserProfile = ({ userName }: UserProfileProps) => {
  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Details</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">{userName}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Personal Account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">$0.00</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Budget</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Not set</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Budgets</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Start tracking your expenses by adding categories and setting up budgets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;