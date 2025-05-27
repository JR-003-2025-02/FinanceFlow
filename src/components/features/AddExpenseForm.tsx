
import { useState } from 'react';
import { DollarSign, Calendar, Tag, FileText, X, Zap } from 'lucide-react';
import { useExpenses } from '../../hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';
import FileUploader from './FileUploader';

interface AddExpenseFormProps {
  categories: { name: string; color: string }[];
  onClose: () => void;
}

const AddExpenseForm = ({ categories, onClose }: AddExpenseFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    receiptUrl: '',
  });
  const [quickMode, setQuickMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addExpense } = useExpenses();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.category) {
      toast({
        title: "Error",
        description: "Please enter an amount and select a category.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const categoryData = categories.find(cat => cat.name === formData.category);
      
      await addExpense({
        description: formData.description || `${formData.category} expense`,
        amount: parseFloat(formData.amount),
        category: formData.category,
        category_color: categoryData?.color || '#3b82f6',
        date: formData.date,
        receiptUrl: formData.receiptUrl,
      });

      toast({
        title: "Success",
        description: "Expense added successfully! 🎉",
      });

      setFormData({
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        receiptUrl: '',
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadComplete = (path: string) => {
    setFormData(prev => ({ ...prev, receiptUrl: path }));
  };

  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <DollarSign size={16} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Expense</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick Mode Toggle */}
      <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <Zap size={16} className="text-blue-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Mode</span>
        </div>
        <button
          type="button"
          onClick={() => setQuickMode(!quickMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            quickMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              quickMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Amount - Always Required */}
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Amount *"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
            required
          />
        </div>

        {/* Category - Always Required */}
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          >
            <option value="">Select category *</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Fields - Only in Detailed Mode */}
        {!quickMode && (
          <>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Upload Receipt (Optional)
              </label>
              <FileUploader onUploadComplete={handleUploadComplete} />
            </div>
          </>
        )}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isSubmitting ? 'Adding...' : quickMode ? 'Quick Add' : 'Add Expense'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
