
import React, { useState, useEffect } from 'react';
import { useJokes } from '../contexts/JokesContext';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Heart, Share, RefreshCw, Plus } from 'lucide-react';

const topics = [
  'General', 'Programming', 'Animals', 'Food', 'Work', 'Dad Jokes', 'Science', 'Sports'
];

const Home = () => {
  const { currentJoke, generateJoke, saveJoke, shareJoke, isLoading, savedJokes } = useJokes();
  const [selectedTopic, setSelectedTopic] = useState('General');
  const [customTopic, setCustomTopic] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    // Generate initial joke
    generateJoke('general');
  }, []);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setShowCustomInput(false);
    setCustomTopic('');
    generateJoke(topic.toLowerCase());
  };

  const handleCustomTopic = () => {
    if (customTopic.trim()) {
      setSelectedTopic(customTopic);
      generateJoke(customTopic.toLowerCase());
      setShowCustomInput(false);
      setCustomTopic('');
    }
  };

  const handleSaveJoke = () => {
    if (currentJoke) {
      // Check if joke is already saved
      const isAlreadySaved = savedJokes.some(joke => joke.id === currentJoke.id);
      if (isAlreadySaved) {
        toast({
          title: "Already saved!",
          description: "This joke is already in your saved collection.",
        });
        return;
      }
      
      saveJoke(currentJoke);
      toast({
        title: "Joke saved!",
        description: "Added to your saved jokes collection.",
      });
    }
  };

  const handleShareJoke = () => {
    if (currentJoke) {
      shareJoke(currentJoke);
      toast({
        title: "Joke shared!",
        description: "Joke copied to clipboard or shared via native share.",
      });
    }
  };

  const handleNewJoke = () => {
    generateJoke(selectedTopic.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Ready for Some Laughs?
          </h1>
          <p className="text-gray-600 text-lg">
            Choose a topic and let's generate some amazing jokes!
          </p>
        </div>

        {/* Topic Selection */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Choose Your Topic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:scale-105 ${
                    selectedTopic === topic
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-purple-400 hover:text-purple-600'
                  }`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </Badge>
              ))}
              
              <Badge
                variant="outline"
                className="cursor-pointer px-4 py-2 text-sm border-dashed border-purple-400 text-purple-600 hover:bg-purple-50 transition-all duration-200 hover:scale-105"
                onClick={() => setShowCustomInput(true)}
              >
                <Plus size={14} className="mr-1" />
                Custom Topic
              </Badge>
            </div>

            {showCustomInput && (
              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Enter your custom topic..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomTopic()}
                  className="flex-1 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                />
                <Button 
                  onClick={handleCustomTopic}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Joke Display */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0 min-h-[300px]">
          <CardContent className="p-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-center space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="text-gray-600">Generating a hilarious joke...</p>
                </div>
              </div>
            ) : currentJoke ? (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    {currentJoke.topic}
                  </Badge>
                  
                  <div className="space-y-4">
                    <p className="text-xl text-gray-800 font-medium leading-relaxed">
                      {currentJoke.setup}
                    </p>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-relaxed">
                        {currentJoke.punchline}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 pt-6">
                  <Button
                    onClick={handleSaveJoke}
                    variant="outline"
                    size="lg"
                    className="border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 hover:scale-105"
                  >
                    <Heart size={20} className="mr-2" />
                    Save Joke
                  </Button>
                  
                  <Button
                    onClick={handleShareJoke}
                    variant="outline"
                    size="lg"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-200 hover:scale-105"
                  >
                    <Share size={20} className="mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={handleNewJoke}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200 hover:scale-105"
                  >
                    <RefreshCw size={20} className="mr-2" />
                    Another Joke
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p>Click on a topic to generate your first joke!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
