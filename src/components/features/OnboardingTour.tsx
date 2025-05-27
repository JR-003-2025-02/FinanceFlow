
import { useState } from 'react';
import { ArrowRight, X, DollarSign, PieChart, Target } from 'lucide-react';

interface OnboardingTourProps {
  onComplete: () => void;
}

const OnboardingTour = ({ onComplete }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to FinanceFlow!',
      description: 'Your smart financial companion for effortless expense tracking. Let\'s get you started with a quick tour.',
      icon: DollarSign,
      color: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Track Expenses Easily',
      description: 'Add expenses with just a few clicks. Include amounts, categories, and even upload receipts for better organization.',
      icon: Target,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Visualize Your Spending',
      description: 'See where your money goes with beautiful charts and insights. Set budgets and track your progress in real-time.',
      icon: PieChart,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scale-in">
        <div className="flex justify-between items-start mb-6">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentStepData.color} flex items-center justify-center`}>
            <Icon size={24} className="text-white" />
          </div>
          <button
            onClick={handleSkip}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {currentStepData.title}
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          {currentStepData.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'bg-blue-500 w-6'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className={`flex items-center space-x-2 px-6 py-2 bg-gradient-to-r ${currentStepData.color} text-white rounded-lg hover:shadow-lg transition-all duration-300`}
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
