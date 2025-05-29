
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Joke {
  id: string;
  setup: string;
  punchline: string;
  topic: string;
  isSaved: boolean;
  savedAt?: Date;
}

interface JokesContextType {
  currentJoke: Joke | null;
  savedJokes: Joke[];
  generateJoke: (topic?: string) => Promise<void>;
  saveJoke: (joke: Joke) => void;
  removeSavedJoke: (jokeId: string) => void;
  shareJoke: (joke: Joke) => void;
  isLoading: boolean;
}

const JokesContext = createContext<JokesContextType | undefined>(undefined);

export const useJokes = () => {
  const context = useContext(JokesContext);
  if (context === undefined) {
    throw new Error('useJokes must be used within a JokesProvider');
  }
  return context;
};

const jokeDatabase = {
  general: [
    { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
    { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
    { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field!" },
  ],
  programming: [
    { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" },
    { setup: "How many programmers does it take to change a light bulb?", punchline: "None, that's a hardware problem!" },
    { setup: "Why do Java developers wear glasses?", punchline: "Because they don't see sharp!" },
  ],
  animals: [
    { setup: "What do you call a sleeping bull?", punchline: "A bulldozer!" },
    { setup: "Why don't elephants use computers?", punchline: "They're afraid of the mouse!" },
    { setup: "What do you call a bear with no teeth?", punchline: "A gummy bear!" },
  ],
  food: [
    { setup: "Why did the tomato turn red?", punchline: "Because it saw the salad dressing!" },
    { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese!" },
    { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" },
  ],
};

export const JokesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [savedJokes, setSavedJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved jokes from localStorage
    const saved = localStorage.getItem('savedJokes');
    if (saved) {
      setSavedJokes(JSON.parse(saved));
    }
  }, []);

  const generateJoke = async (topic: string = 'general') => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const topicJokes = jokeDatabase[topic.toLowerCase() as keyof typeof jokeDatabase] || jokeDatabase.general;
    const randomJoke = topicJokes[Math.floor(Math.random() * topicJokes.length)];
    
    const joke: Joke = {
      id: Date.now().toString(),
      setup: randomJoke.setup,
      punchline: randomJoke.punchline,
      topic: topic,
      isSaved: false,
    };
    
    setCurrentJoke(joke);
    setIsLoading(false);
  };

  const saveJoke = (joke: Joke) => {
    const savedJoke = { ...joke, isSaved: true, savedAt: new Date() };
    const newSavedJokes = [...savedJokes, savedJoke];
    setSavedJokes(newSavedJokes);
    localStorage.setItem('savedJokes', JSON.stringify(newSavedJokes));
    
    if (currentJoke?.id === joke.id) {
      setCurrentJoke(savedJoke);
    }
  };

  const removeSavedJoke = (jokeId: string) => {
    const newSavedJokes = savedJokes.filter(joke => joke.id !== jokeId);
    setSavedJokes(newSavedJokes);
    localStorage.setItem('savedJokes', JSON.stringify(newSavedJokes));
  };

  const shareJoke = (joke: Joke) => {
    const text = `${joke.setup}\n\n${joke.punchline}\n\n#JokeGenerator`;
    if (navigator.share) {
      navigator.share({
        title: 'Check out this joke!',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <JokesContext.Provider value={{
      currentJoke,
      savedJokes,
      generateJoke,
      saveJoke,
      removeSavedJoke,
      shareJoke,
      isLoading,
    }}>
      {children}
    </JokesContext.Provider>
  );
};
