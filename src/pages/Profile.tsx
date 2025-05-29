
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJokes } from '../contexts/JokesContext';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { User, Heart, TrendingUp, Calendar } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { savedJokes } = useJokes();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');

  const handleSaveProfile = () => {
    // In a real app, this would make an API call
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const getJokeStats = () => {
    const topicCounts: { [key: string]: number } = {};
    savedJokes.forEach(joke => {
      topicCounts[joke.topic] = (topicCounts[joke.topic] || 0) + 1;
    });
    
    const sortedTopics = Object.entries(topicCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3);

    return {
      totalJokes: savedJokes.length,
      favoriteTopics: sortedTopics,
      joinDate: new Date().toLocaleDateString(), // Mock join date
    };
  };

  const stats = getJokeStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account and view your joke statistics
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-blue-600 text-white text-2xl">
                      {user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-2">
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleSaveProfile}
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Save
                          </Button>
                          <Button 
                            onClick={() => setIsEditing(false)}
                            variant="outline"
                            size="sm"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
                        <p className="text-gray-600">{user?.email}</p>
                        <Button 
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          size="sm"
                          className="mt-2"
                        >
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-800">Account Actions</h4>
                      <p className="text-sm text-gray-600">Manage your account settings</p>
                    </div>
                    <Button 
                      onClick={handleLogout}
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Card */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {stats.totalJokes}
                  </div>
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Heart size={14} className="text-red-500" />
                    Jokes Saved
                  </p>
                </div>

                {stats.favoriteTopics.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Favorite Topics</h4>
                    <div className="space-y-2">
                      {stats.favoriteTopics.map(([topic, count]) => (
                        <div key={topic} className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                          <span className="text-sm font-medium text-gray-600">
                            {count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>Joined {stats.joinDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
