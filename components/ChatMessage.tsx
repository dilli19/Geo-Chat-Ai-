
import React from 'react';
import { Message } from '../types';
import SourceLink from './SourceLink';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-prose rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
      } shadow-md`}>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200/20 dark:border-gray-600">
            <h4 className="text-xs font-semibold mb-2 opacity-80">Sources:</h4>
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source, index) => (
                <SourceLink key={index} source={source} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
