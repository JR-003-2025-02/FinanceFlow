import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getUserProfile, updateUserProfile, type UserProfile as IUserProfile } from '@/lib/userProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const UserProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getUserProfile();
      setProfile(profile);
      setEditName(profile?.full_name || '');
    };
    
    loadProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const { data, error } = await updateUserProfile({
        full_name: editName
      });
      
      if (error) throw error;
      if (data) {
        setProfile(data);
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user || !profile) {
    return (
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <p className="text-gray-500 dark:text-gray-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Details</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-semibold">
              {profile.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="max-w-xs"
                  placeholder="Enter your name"
                />
                <Button onClick={handleUpdateProfile} size="sm">Save</Button>
                <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {profile.full_name || user.email}
                </h4>
                <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">Edit</Button>
              </div>
            )}
            <p className="text-sm text-gray-500 dark:text-gray-400">Personal Account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">$0.00</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Budget</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">Not set</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Budgets</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">0</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            Start tracking your expenses by adding categories and setting up budgets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;