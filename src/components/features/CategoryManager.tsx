
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  color: string;
  isCustom: boolean;
}

interface CategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

const CategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }: CategoryManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6' });

  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
  ];

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      onAddCategory({
        name: newCategory.name.trim(),
        color: newCategory.color,
        isCustom: true
      });
      setNewCategory({ name: '', color: '#3b82f6' });
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Categories</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: category.color }}
              ></div>
              {editingId === category.id ? (
                <input
                  type="text"
                  defaultValue={category.name}
                  onBlur={(e) => {
                    onEditCategory(category.id, { name: e.target.value });
                    setEditingId(null);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onEditCategory(category.id, { name: e.currentTarget.value });
                      setEditingId(null);
                    }
                  }}
                  className="px-2 py-1 bg-white dark:bg-gray-700 border rounded"
                  autoFocus
                />
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
              )}
            </div>
            {category.isCustom && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingId(category.id)}
                  className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteCategory(category.id)}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Category name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setNewCategory({ ...newCategory, color })}
                    className={`w-6 h-6 rounded-full border-2 ${
                      newCategory.color === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
