
import { useState } from 'react';
import { Plus } from 'lucide-react';
import AddExpenseForm from './AddExpenseForm';

const AddExpenseButton = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categories = [
    { name: 'Food & Dining', color: '#ef4444' },
    { name: 'Transportation', color: '#3b82f6' },
    { name: 'Shopping', color: '#8b5cf6' },
    { name: 'Housing', color: '#f59e0b' },
    { name: 'Entertainment', color: '#10b981' },
    { name: 'Healthcare', color: '#f97316' },
    { name: 'Utilities', color: '#84cc16' },
    { name: 'Other', color: '#6b7280' }
  ];

  if (isFormOpen) {
    return (
      <AddExpenseForm 
        categories={categories} 
        onClose={() => setIsFormOpen(false)}
      />
    );
  }

  return (
    <button
      onClick={() => setIsFormOpen(true)}
      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <Plus size={20} />
      <span>Add Expense</span>
    </button>
  );
};

export default AddExpenseButton;
