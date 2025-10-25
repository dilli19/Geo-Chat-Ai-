
import React from 'react';
import { GroundingSource } from '../types';

interface SourceLinkProps {
  source: GroundingSource;
}

const SourceLink: React.FC<SourceLinkProps> = ({ source }) => {
  const isMapLink = source.uri.includes('google.com/maps');

  return (
    <a
      href={source.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors"
    >
      {isMapLink ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.657a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM1.293 8.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM14.95 5.05a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707z" />
        </svg>
      )}
      <span className="truncate max-w-[200px]">{source.title || new URL(source.uri).hostname}</span>
    </a>
  );
};

export default SourceLink;
