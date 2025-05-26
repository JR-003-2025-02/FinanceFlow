
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import ExpenseList from '../components/features/ExpenseList';

const ExpensesPage = () => {
  const [expenses] = useState([
    {
      id: '1',
      amount: 45.50,
      category: 'Food & Dining',
      description: 'Lunch at cafe',
      date: '2024-05-25',
      category_color: '#ef4444'
    },
    {
      id: '2',
      amount: 120.00,
      category: 'Transportation',
      description: 'Gas station',
      date: '2024-05-24',
      category_color: '#3b82f6'
    },
    {
      id: '3',
      amount: 89.99,
      category: 'Shopping',
      description: 'Online purchase',
      date: '2024-05-23',
      category_color: '#8b5cf6'
    },
    {
      id: '4',
      amount: 1200.00,
      category: 'Housing',
      description: 'Monthly rent',
      date: '2024-05-01',
      category_color: '#f59e0b'
    },
    {
      id: '5',
      amount: 65.75,
      category: 'Food & Dining',
      description: 'Grocery shopping',
      date: '2024-05-20',
      category_color: '#ef4444'
    },
    {
      id: '6',
      amount: 25.00,
      category: 'Transportation',
      description: 'Bus ticket',
      date: '2024-05-19',
      category_color: '#3b82f6'
    }
  ]);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            All Expenses
          </h1>
          <p className="text-gray-600">
            View and manage all your expenses
          </p>
        </div>

        <ExpenseList expenses={expenses} />
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;
