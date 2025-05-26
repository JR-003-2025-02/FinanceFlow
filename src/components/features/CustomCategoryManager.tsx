
import { useState } from 'react';
import { Plus, Edit, Trash2, Palette } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

interface CustomCategoryManagerProps {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onEditCategory: (id: string, category: Partial<Category>) => void;
  onDeleteCategory: (id: string) => void;
}

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
  '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#6b7280'
];

const CustomCategoryManager = ({ categories, onAddCategory, onEditCategory, onDeleteCategory }: CustomCategoryManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#3b82f6' });

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      onAddCategory(newCategory);
      setNewCategory({ name: '', color: '#3b82f6' });
      setIsAdding(false);
    }
  };

  const handleEditCategory = (id: string, updates: Partial<Category>) => {
    onEditCategory(id, updates);
    setEditingId(null);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Palette className="text-purple-600" size={24} />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Custom Categories</h3>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus size={16} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            {editingId === category.id ? (
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
                <div className="flex space-x-1">
                  {PRESET_COLORS.slice(0, 6).map(color => (
                    <button
                      key={color}
                      onClick={() => handleEditCategory(category.id, { color })}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleEditCategory(category.id, { name: newCategory.name })}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(category.id);
                      setNewCategory({ name: category.name, color: category.color });
                    }}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteCategory(category.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="space-y-4">
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Category name"
                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
              
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setNewCategory({ ...newCategory, color })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newCategory.color === color ? 'border-gray-800' : 'border-white'
                    } shadow-sm`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Add Category
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

export default CustomCategoryManager;
