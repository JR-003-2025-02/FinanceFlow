
import { useState } from 'react';
import { Trash, Edit } from 'lucide-react';
import { useExpenses } from '../../hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  category_color: string;
}

interface ExpenseItemProps {
  expense: Expense;
}

const ExpenseItem = ({ expense }: ExpenseItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteExpense } = useExpenses();
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteExpense(expense.id);
      toast({
        title: "Success",
        description: "Expense deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: expense.category_color + '20' }}
          >
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: expense.category_color }}
            ></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{expense.description}</h4>
            <p className="text-sm text-gray-600">{expense.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">${expense.amount.toFixed(2)}</p>
            <p className="text-sm text-gray-600">{expense.date}</p>
          </div>
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
