
import React, { useState, useEffect, useRef } from 'react';
import { Message, Location } from './types';
import { runQuery } from './services/geminiService';
import MapPlaceholder from './components/MapPlaceholder';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationError(null);
        setMessages([
          {
            id: 'initial-model-message',
            role: 'model',
            text: "Hello! I'm GeoChat AI. I have your location. Feel free to ask me anything about your surroundings or any other topic!",
          }
        ]);
      },
      (err) => {
        setLocationError(err.message);
        setMessages([
          {
            id: 'initial-model-message',
            role: 'model',
            text: "Hello! I'm GeoChat AI. I couldn't access your location, but you can still ask me general questions.",
          }
        ]);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    setError(null);
    setIsLoading(true);
    const userMessage: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMessage]);

    try {
      const { text: modelText, sources } = await runQuery(text, location);
      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: modelText,
        sources,
      };
      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
       const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `Sorry, something went wrong: ${errorMessage}`,
      };
      setMessages(prev => [...prev, modelMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans text-gray-800 dark:text-gray-200">
      <aside className="md:w-1/3 lg:w-1/4 p-4 bg-gray-100 dark:bg-gray-900">
        <MapPlaceholder location={location} locationError={locationError} />
      </aside>
      <main className="flex-1 flex flex-col bg-gray-200 dark:bg-gray-800/50">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-prose rounded-2xl px-4 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-md flex items-center space-x-2">
                 <LoadingSpinner />
                 <span>Thinking...</span>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 text-center">{error}</div>}
           <div ref={chatEndRef} />
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
