import React from 'react';
import type { Animal } from '../types';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { StopIcon } from './icons/StopIcon';

interface TranslationOutputProps {
  animal: Animal;
  translation: string;
  isLoading: boolean;
  isPlaying: boolean;
  onPlaySound: () => void;
}

const TranslationOutput: React.FC<TranslationOutputProps> = ({ animal, translation, isLoading, isPlaying, onPlaySound }) => {
  const hasTranslation = translation && !isLoading;

  return (
    <div className="mt-6">
      <div className="bg-emerald-50/70 rounded-lg p-4 min-h-[120px] flex items-center justify-center transition-all duration-300">
        <div className="flex items-center gap-4 w-full">
          <div className={`flex-shrink-0 p-3 rounded-full transition-colors duration-300 ${hasTranslation ? 'bg-teal-200' : 'bg-gray-200'}`}>
            <animal.icon className={`w-10 h-10 transition-colors duration-300 ${hasTranslation ? 'text-teal-700' : 'text-gray-500'}`} />
          </div>
          <div className="flex-grow text-left">
            {!hasTranslation && (
              <p className="text-gray-500 italic">
                {isLoading ? 'Listening to the animals...' : `The ${animal.name} is waiting for your message...`}
              </p>
            )}
            {hasTranslation && (
              <p key={translation} className="text-xl font-semibold text-teal-800 break-words animate-fadeInSlideUp">{translation}</p>
            )}
          </div>
          {hasTranslation && (
            <button
              onClick={onPlaySound}
              className={`flex-shrink-0 p-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-50 transition-all duration-200 transform hover:scale-110 active:scale-95
                ${isPlaying
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 animate-pulse'
                  : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
                }`}
              aria-label={isPlaying ? "Stop sound" : "Play sound"}
            >
              {isPlaying
                ? <StopIcon className="w-6 h-6 text-white" />
                : <SpeakerIcon className="w-6 h-6 text-white" />
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationOutput;