
import React from 'react';
import { useJokes } from '../contexts/JokesContext';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Heart, Share, Trash2 } from 'lucide-react';

const SavedJokes = () => {
  const { savedJokes, removeSavedJoke, shareJoke } = useJokes();

  const handleRemoveJoke = (jokeId: string) => {
    removeSavedJoke(jokeId);
    toast({
      title: "Joke removed",
      description: "Joke has been removed from your saved collection.",
    });
  };

  const handleShareJoke = (joke: any) => {
    shareJoke(joke);
    toast({
      title: "Joke shared!",
      description: "Joke copied to clipboard or shared via native share.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Your Saved Jokes
          </h1>
          <p className="text-gray-600 text-lg">
            Your personal collection of favorite jokes
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Heart className="text-red-500" size={20} />
            <span className="text-gray-700 font-medium">
              {savedJokes.length} jokes saved
            </span>
          </div>
        </div>

        {/* Jokes Grid */}
        {savedJokes.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="text-6xl">😢</div>
                <h3 className="text-xl font-semibold text-gray-700">No saved jokes yet</h3>
                <p className="text-gray-600">
                  Start saving jokes from the home page to build your personal collection!
                </p>
                <Button
                  onClick={() => window.location.href = '/home'}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Discover Jokes
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {savedJokes.map((joke) => (
              <Card key={joke.id} className="bg-white/90 backdrop-blur-sm shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        {joke.topic}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {joke.savedAt && new Date(joke.savedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-lg text-gray-800 font-medium leading-relaxed">
                        {joke.setup}
                      </p>
                      
                      <div className="border-t border-gray-200 pt-3">
                        <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-relaxed">
                          {joke.punchline}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        onClick={() => handleShareJoke(joke)}
                        variant="outline"
                        size="sm"
                        className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200"
                      >
                        <Share size={16} className="mr-1" />
                        Share
                      </Button>
                      
                      <Button
                        onClick={() => handleRemoveJoke(joke.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 transition-all duration-200"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJokes;
