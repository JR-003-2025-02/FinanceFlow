
import { useState } from 'react';
import { Filter, Calendar, DollarSign, Tag } from 'lucide-react';

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

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableCategories: string[];
  totalExpenses: number;
}

const AdvancedFilters = ({ onFilterChange, availableCategories, totalExpenses }: AdvancedFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      start: '',
      end: ''
    },
    amountRange: {
      min: 0,
      max: 10000
    },
    categories: [],
    searchTerm: ''
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      dateRange: { start: '', end: '' },
      amountRange: { min: 0, max: 10000 },
      categories: [],
      searchTerm: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: newCategories });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="text-blue-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900">Advanced Filters</h3>
          <span className="text-sm text-gray-600">({totalExpenses} expenses)</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search descriptions..."
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Start Date
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => updateFilters({ 
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                End Date
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => updateFilters({ 
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Amount Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Min Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.amountRange.min}
                onChange={(e) => updateFilters({ 
                  amountRange: { ...filters.amountRange, min: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Max Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.amountRange.max}
                onChange={(e) => updateFilters({ 
                  amountRange: { ...filters.amountRange, max: parseFloat(e.target.value) || 10000 }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag size={16} className="inline mr-1" />
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;
