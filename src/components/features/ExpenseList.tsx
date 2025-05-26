
import { useState, useMemo } from 'react';
import ExpenseItem from './ExpenseItem';
import AdvancedFilters from './AdvancedFilters';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  category_color: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

interface FilterOptions {
  dateRange: {
    start: string;
    end: string;
  };
  amountRange: {
    min: number;
    max: number;
  };
  categories: string[];
  searchTerm: string;
}

const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { start: '', end: '' },
    amountRange: { min: 0, max: 10000 },
    categories: [],
    searchTerm: ''
  });

  const categories = [...new Set(expenses.map(expense => expense.category))];

  const filteredAndSortedExpenses = useMemo(() => {
    return expenses
      .filter(expense => {
        // Search filter
        const matchesSearch = expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                             expense.category.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        // Category filter
        const matchesCategory = filters.categories.length === 0 || filters.categories.includes(expense.category);
        
        // Date range filter
        const matchesDateRange = (!filters.dateRange.start || expense.date >= filters.dateRange.start) &&
                                (!filters.dateRange.end || expense.date <= filters.dateRange.end);
        
        // Amount range filter
        const matchesAmountRange = expense.amount >= filters.amountRange.min && 
                                  expense.amount <= filters.amountRange.max;

        return matchesSearch && matchesCategory && matchesDateRange && matchesAmountRange;
      })
      .sort((a, b) => {
        let aValue, bValue;
        
        switch (sortBy) {
          case 'amount':
            aValue = a.amount;
            bValue = b.amount;
            break;
          case 'category':
            aValue = a.category;
            bValue = b.category;
            break;
          case 'description':
            aValue = a.description;
            bValue = b.description;
            break;
          default: // date
            aValue = new Date(a.date);
            bValue = new Date(b.date);
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
  }, [expenses, filters, sortBy, sortOrder]);

  return (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <AdvancedFilters
        onFilterChange={setFilters}
        availableCategories={categories}
        totalExpenses={filteredAndSortedExpenses.length}
      />

      {/* Basic Controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
              <option value="description">Description</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            Expenses ({filteredAndSortedExpenses.length} of {expenses.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredAndSortedExpenses.length > 0 ? (
            filteredAndSortedExpenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No expenses found</h3>
              <p className="text-gray-600">
                {expenses.length === 0 
                  ? "Start by adding your first expense!" 
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;
