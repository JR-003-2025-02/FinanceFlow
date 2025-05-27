
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentExpenses: number;
  currentBudgetUsage: number;
  totalSpent: number;
}

const ProgressIndicator = ({ currentExpenses, currentBudgetUsage, totalSpent }: ProgressIndicatorProps) => {
  const achievements = [
    {
      id: 'first-expense',
      title: 'First Expense',
      description: 'Track your first expense',
      completed: currentExpenses >= 1,
      icon: TrendingUp,
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'expense-streak',
      title: 'Getting Started',
      description: 'Add 5 expenses',
      completed: currentExpenses >= 5,
      icon: Target,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 'budget-conscious',
      title: 'Budget Conscious',
      description: 'Stay under 80% of budget',
      completed: currentBudgetUsage < 80 && currentExpenses > 0,
      icon: Trophy,
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const completedCount = achievements.filter(a => a.completed).length;
  const progressPercentage = (completedCount / achievements.length) * 100;

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Your Progress</h3>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {completedCount}/{achievements.length} completed
        </span>
      </div>
      
      <Progress value={progressPercentage} className="mb-4" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.completed
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800'
                  : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${achievement.color}`}>
                  <Icon size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.completed ? 'text-green-800 dark:text-green-200' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {achievement.title}
                  </h4>
                </div>
                {achievement.completed && (
                  <div className="text-green-600 dark:text-green-400">
                    ✓
                  </div>
                )}
              </div>
              <p className={`text-sm ${
                achievement.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
