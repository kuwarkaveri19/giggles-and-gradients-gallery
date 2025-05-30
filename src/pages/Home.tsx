
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
    <div className="min-h-screen relative">
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-slate-100/15 backdrop-blur-sm"></div>
      
      <Navigation />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Welcome Header with decorative image */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop&crop=center" 
                alt="Happy and fun atmosphere" 
                className="w-64 h-40 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-50 via-blue-100 to-slate-200 bg-clip-text text-transparent drop-shadow-lg">
            Ready for Some Laughs?
          </h1>
          <p className="text-slate-100 text-2xl font-medium max-w-2xl mx-auto drop-shadow-md">
            Choose a topic and let's generate some amazing jokes! Professional humor for every occasion.
          </p>
        </div>

        {/* Topic Selection */}
        <Card className="bg-slate-50/90 backdrop-blur-lg shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-slate-100/95 to-slate-50/80 rounded-t-lg">
            <CardTitle className="text-3xl text-gray-800 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-slate-50 text-lg">🎯</span>
              </div>
              Choose Your Topic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    selectedTopic === topic
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-slate-50 shadow-lg'
                      : 'border-blue-300 text-blue-700 hover:border-blue-500 hover:text-blue-800 hover:bg-blue-50'
                  }`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  {topic}
                </Badge>
              ))}
              
              <Badge
                variant="outline"
                className="cursor-pointer px-6 py-3 text-lg font-medium border-dashed border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 hover:scale-105"
                onClick={() => setShowCustomInput(true)}
              >
                <Plus size={18} className="mr-2" />
                Custom Topic
              </Badge>
            </div>

            {showCustomInput && (
              <div className="flex gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <Input
                  placeholder="Enter your custom topic..."
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomTopic()}
                  className="flex-1 border-blue-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 text-lg"
                />
                <Button 
                  onClick={handleCustomTopic}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-slate-50 px-6 text-lg"
                >
                  Add
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Joke Display */}
        <Card className="bg-slate-50/95 backdrop-blur-lg shadow-2xl border-0 min-h-[400px] hover:shadow-3xl transition-all duration-300">
          <CardContent className="p-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center space-y-6">
                  <img 
                    src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=200&h=200&fit=crop&crop=center" 
                    alt="Loading magic" 
                    className="w-24 h-24 object-cover rounded-full mx-auto animate-pulse shadow-lg"
                  />
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-700 text-xl font-medium">Generating a hilarious joke...</p>
                </div>
              </div>
            ) : currentJoke ? (
              <div className="space-y-8">
                <div className="text-center space-y-6">
                  <div className="flex justify-center items-center gap-4">
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-slate-50 px-4 py-2 text-xl">
                      {currentJoke.topic}
                    </Badge>
                    <img 
                      src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=80&h=80&fit=crop&crop=center" 
                      alt="Joke decoration" 
                      className="w-12 h-12 object-cover rounded-full shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-6 max-w-3xl mx-auto">
                    <div className="bg-gradient-to-r from-slate-100/95 to-blue-50/95 p-6 rounded-xl border border-blue-100">
                      <p className="text-2xl text-gray-800 font-medium leading-relaxed">
                        {currentJoke.setup}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-50/95 to-slate-100/95 p-6 rounded-xl border border-blue-200 shadow-lg">
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent leading-relaxed">
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
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 hover:scale-105 px-6 text-lg"
                  >
                    <Heart size={22} className="mr-2" />
                    Save Joke
                  </Button>
                  
                  <Button
                    onClick={handleShareJoke}
                    variant="outline"
                    size="lg"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 hover:scale-105 px-6 text-lg"
                  >
                    <Share size={22} className="mr-2" />
                    Share
                  </Button>
                  
                  <Button
                    onClick={handleNewJoke}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-slate-50 transition-all duration-300 hover:scale-105 shadow-lg px-6 text-lg"
                  >
                    <RefreshCw size={22} className="mr-2" />
                    Another Joke
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-blue-600 py-20">
                <img 
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=200&fit=crop&crop=center" 
                  alt="Welcome" 
                  className="w-48 h-32 object-cover rounded-xl mx-auto mb-6 shadow-lg"
                />
                <p className="text-xl">Click on a topic to generate your first joke!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
