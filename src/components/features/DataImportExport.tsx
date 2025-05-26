
import { useState } from 'react';
import { Download, Upload, FileText, AlertCircle } from 'lucide-react';
import { useExpenses, type Expense } from '@/hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';

const DataImportExport = () => {
  const { expenses, addExpense } = useExpenses();
  const { toast } = useToast();
  const [importing, setImporting] = useState(false);

  const exportToCSV = () => {
    if (expenses.length === 0) {
      toast({
        title: "No Data",
        description: "No expenses to export",
        variant: "destructive",
      });
      return;
    }

    const headers = ['Date', 'Description', 'Category', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...expenses.map(expense => [
        expense.date,
        `"${expense.description}"`,
        `"${expense.category}"`,
        expense.amount
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: `Exported ${expenses.length} expenses to CSV`,
    });
  };

  const handleFileImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid File",
        description: "Please select a CSV file",
        variant: "destructive",
      });
      return;
    }

    setImporting(true);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        throw new Error('CSV file must have at least a header and one data row');
      }

      const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''));
      const dataLines = lines.slice(1);

      let imported = 0;
      let errors = 0;

      for (const line of dataLines) {
        try {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          
          const dateIndex = headers.findIndex(h => h.includes('date'));
          const descIndex = headers.findIndex(h => h.includes('description') || h.includes('desc'));
          const categoryIndex = headers.findIndex(h => h.includes('category'));
          const amountIndex = headers.findIndex(h => h.includes('amount') || h.includes('price'));

          if (dateIndex === -1 || descIndex === -1 || categoryIndex === -1 || amountIndex === -1) {
            throw new Error('Required columns not found');
          }

          const expense = {
            date: values[dateIndex] || new Date().toISOString().split('T')[0],
            description: values[descIndex] || 'Imported expense',
            category: values[categoryIndex] || 'Other',
            amount: parseFloat(values[amountIndex]) || 0,
            category_color: '#6b7280'
          };

          if (expense.amount > 0) {
            await addExpense(expense);
            imported++;
          }
        } catch (error) {
          errors++;
        }
      }

      toast({
        title: "Import Complete",
        description: `Imported ${imported} expenses${errors > 0 ? `, ${errors} errors` : ''}`,
      });

    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to parse CSV file. Please check the format.",
        variant: "destructive",
      });
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-6">
        <FileText className="text-blue-600" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Data Import/Export</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Export Data</h4>
          <p className="text-sm text-gray-600">
            Download your expense data as a CSV file for backup or analysis in other tools.
          </p>
          <button
            onClick={exportToCSV}
            disabled={expenses.length === 0}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Download size={18} />
            <span>Export to CSV ({expenses.length} expenses)</span>
          </button>
        </div>

        {/* Import Section */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Import Data</h4>
          <p className="text-sm text-gray-600">
            Upload a CSV file with columns: Date, Description, Category, Amount
          </p>
          <div className="relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileImport}
              disabled={importing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button
              disabled={importing}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <Upload size={18} />
              <span>{importing ? 'Importing...' : 'Import from CSV'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="text-blue-600 mt-0.5" size={16} />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">CSV Format Requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Headers must include: Date, Description, Category, Amount</li>
              <li>Date format: YYYY-MM-DD (e.g., 2024-01-15)</li>
              <li>Amount should be a positive number</li>
              <li>Use quotes around text fields containing commas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataImportExport;
