
import React, { useState, useCallback, useEffect } from 'react';
import { translateToAnimalSound } from './services/geminiService';
// Fix: The 'Animal' type is defined in 'types.ts', not 'constants.ts'.
import { ANIMALS } from './constants';
import type { Animal } from './types';
import AnimalSelector from './components/AnimalSelector';
import TranslationOutput from './components/TranslationOutput';
import Loader from './components/Loader';
import { GithubIcon } from './components/icons/GithubIcon';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello, world! How are you today?');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(ANIMALS[0]);
  const [translationResult, setTranslationResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [volume, setVolume] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Clean up speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTranslate = useCallback(async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }
    if (!process.env.API_KEY) {
      setError("API key is missing. Please configure your environment.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setTranslationResult('');

    try {
      const result = await translateToAnimalSound(inputText, selectedAnimal.name);
      setTranslationResult(result);
    } catch (err) {
      setError('Failed to get translation. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedAnimal]);

  const handlePlaySound = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    if (translationResult) {
      const utterance = new SpeechSynthesisUtterance(translationResult);
      utterance.volume = volume;
      utterance.pitch = pitch;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        setError('Sorry, there was an error playing the sound.');
      };

      speechSynthesis.speak(utterance);
    }
  }, [translationResult, volume, pitch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-teal-200 text-gray-800 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-teal-700">Animal Sound Translator</h1>
            <p className="text-gray-600 mt-2">Hear your words in the language of the wild!</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="human-text" className="block text-sm font-medium text-gray-700 mb-1">
                Your message
              </label>
              <textarea
                id="human-text"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 bg-white/50"
                placeholder="Type something to translate..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </div>

            <AnimalSelector
              selectedAnimal={selectedAnimal}
              onSelectAnimal={setSelectedAnimal}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label htmlFor="volume-slider" className="block text-sm font-medium text-gray-700 mb-1">
                  Volume: <span className="font-bold text-teal-600">{Math.round(volume * 100)}%</span>
                </label>
                <input
                  id="volume-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>
              <div>
                <label htmlFor="pitch-slider" className="block text-sm font-medium text-gray-700 mb-1">
                  Pitch: <span className="font-bold text-teal-600">{pitch.toFixed(1)}x</span>
                </label>
                <input
                  id="pitch-slider"
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
              </div>
            </div>

            <button
              onClick={handleTranslate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-transform transform hover:scale-102 active:scale-98 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader />
                  Translating...
                </>
              ) : (
                'Translate to Animal Sound'
              )}
            </button>

            {error && <div className="text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</div>}

            <TranslationOutput
              animal={selectedAnimal}
              translation={translationResult}
              isLoading={isLoading}
              isPlaying={isPlaying}
              onPlaySound={handlePlaySound}
            />
          </div>
        </div>
      </main>
      <footer className="text-center mt-8 text-gray-500">
        <p>Powered by Tecno Spark</p>
         <a
          href="https://github.com/google/genai-js"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-2 hover:text-teal-700 transition-colors"
        >
          <GithubIcon className="w-5 h-5" />
          <span>View on GitHub</span>
        </a>
      </footer>
    </div>
  );
};

export default App;
