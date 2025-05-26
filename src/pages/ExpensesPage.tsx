
import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ExpenseList from '../components/features/ExpenseList';
import AddExpenseButton from '../components/features/AddExpenseButton';
import { useExpenses } from '../hooks/useExpenses';

const ExpensesPage = () => {
  const { expenses, loading, fetchExpenses } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All Expenses
            </h1>
            <p className="text-gray-600">
              View and manage all your expenses
            </p>
          </div>
          <AddExpenseButton />
        </div>

        <ExpenseList expenses={expenses} />
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;
