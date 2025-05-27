
# FinanceFlow 💰

A modern, real-time expense tracking application built with React, TypeScript, and Supabase. FinanceFlow helps you manage your finances with powerful features like real-time synchronization, advanced analytics, budget tracking, and comprehensive expense management.

## 🚀 Features

### Core Functionality
- **User Authentication** - Secure signup/login with Supabase Auth
- **Expense Management** - Add, edit, delete, and categorize expenses
- **Real-time Sync** - Live updates across all connected devices
- **Receipt Upload** - Attach receipts and documents to expenses
- **Budget Tracking** - Set and monitor budget goals with visual progress
- **Category Management** - Custom expense categories with color coding

### Advanced Features
- **Financial Analytics** - Interactive charts and spending insights
- **Data Import/Export** - CSV import/export for data portability
- **Advanced Filtering** - Search, filter by date range, amount, and category
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark Mode Support** - Toggle between light and dark themes
- **Real-time Presence** - See other users online in real-time

### Dashboard & Reporting
- **Interactive Charts** - Pie charts showing spending by category
- **Financial Summary** - Overview of total expenses and budget usage
- **Recent Expenses** - Quick view of latest transactions
- **Monthly Trends** - Track spending patterns over time
- **Budget Progress** - Visual indicators for budget goals

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (Database, Auth, Real-time, Storage)
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React Hooks, TanStack React Query
- **Routing**: React Router v6

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Setup Instructions

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd financeflow
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Create a new Supabase project at https://supabase.com
   - Copy your project URL and anon key
   - Update `src/integrations/supabase/client.ts` with your credentials

4. **Set up the database**
   - Run the following SQL in your Supabase SQL editor:

```sql
-- Create expenses table
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  amount NUMERIC NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  category_color TEXT NOT NULL DEFAULT '#3b82f6',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own expenses" 
  ON public.expenses FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own expenses" 
  ON public.expenses FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own expenses" 
  ON public.expenses FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own expenses" 
  ON public.expenses FOR DELETE 
  USING (auth.uid() = user_id);

-- Enable real-time for expenses table
ALTER TABLE public.expenses REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
```

5. **Set up Storage (Optional)**
   - Create a storage bucket for expense attachments:
```sql
INSERT INTO storage.buckets (id, name, public) 
VALUES ('expense-attachments', 'expense-attachments', true);
```

6. **Start the development server**
```bash
npm run dev
```

7. **Configure Authentication**
   - In your Supabase dashboard, go to Authentication > Settings
   - Add your local development URL (http://localhost:5173) to Site URL
   - Configure any additional auth providers as needed

## 📊 Database Schema

### Expenses Table
```sql
expenses (
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key to auth.users)
  amount: NUMERIC
  description: TEXT
  category: TEXT
  category_color: TEXT
  date: DATE
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
)
```

### Storage Buckets
- `expense-attachments`: For storing receipt images and documents

## 🎯 Usage Guide

### Getting Started
1. **Sign Up/Login** - Create an account or login to access your dashboard
2. **Add Your First Expense** - Click "Add Expense" to record a transaction
3. **Set Categories** - Organize expenses with custom categories and colors
4. **Upload Receipts** - Attach receipt images for better record keeping

### Managing Expenses
- **Quick Add**: Use the floating action button for fast expense entry
- **Bulk Import**: Import expenses from CSV files
- **Advanced Search**: Filter by date range, amount, category, or description
- **Real-time Updates**: See changes instantly across all your devices

### Budget Tracking
- **Set Monthly Budgets**: Define spending limits for better control
- **Visual Progress**: Monitor budget usage with progress bars
- **Category Budgets**: Set individual budgets for different expense categories

### Analytics & Reports
- **Spending Charts**: Visualize expenses by category with interactive pie charts
- **Monthly Trends**: Track spending patterns over time
- **Export Data**: Download your data as CSV for external analysis

## 🚀 Deployment

### Deploy to Production

1. **Prepare for deployment**
```bash
npm run build
```

2. **Deploy to Vercel (Recommended)**
```bash
npm install -g vercel
vercel --prod
```

3. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

4. **Update Supabase Settings**
   - Add your production URL to Supabase Auth settings
   - Update CORS settings if needed

### Environment Configuration
- Ensure your Supabase project credentials are properly configured
- Update Site URL and redirect URLs in Supabase dashboard
- Configure any additional environment variables

## 📱 Features Breakdown

### Phase 1: Core Features
- ✅ User authentication with Supabase
- ✅ Basic expense CRUD operations
- ✅ Category management with color coding
- ✅ Responsive dashboard with charts
- ✅ Receipt upload functionality

### Phase 2: Enhanced Features
- ✅ Advanced filtering and search
- ✅ Budget tracking with progress indicators
- ✅ Financial summary dashboard
- ✅ Data export capabilities
- ✅ Improved user experience

### Phase 3: Advanced Features
- ✅ Real-time data synchronization
- ✅ CSV import/export functionality
- ✅ Enhanced reporting and analytics
- ✅ Real-time user presence
- ✅ Advanced filtering options

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: [Supabase Docs](https://supabase.com/docs)
- **Community**: [Discord](https://discord.supabase.com)
- **Issues**: Please report bugs via GitHub Issues

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Backend powered by [Supabase](https://supabase.com)
- Icons by [Lucide](https://lucide.dev)

---

**FinanceFlow** - Take control of your finances with real-time expense tracking and powerful analytics. 💰✨
