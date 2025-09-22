import React from 'react';
// Fix: The 'Animal' type is defined in 'types.ts', not 'constants.ts'.
import { ANIMALS } from '../constants';
import type { Animal } from '../types';

interface AnimalSelectorProps {
  selectedAnimal: Animal;
  onSelectAnimal: (animal: Animal) => void;
}

const AnimalSelector: React.FC<AnimalSelectorProps> = ({ selectedAnimal, onSelectAnimal }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2 text-center">Select an Animal</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {ANIMALS.map((animal) => (
          <button
            key={animal.name}
            onClick={() => onSelectAnimal(animal)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
              ${selectedAnimal.name === animal.name
                ? 'bg-teal-500 border-teal-600 text-white shadow-lg scale-105'
                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            aria-pressed={selectedAnimal.name === animal.name}
          >
            <animal.icon className={`w-8 h-8 sm:w-10 sm:h-10 mb-1 transition-transform duration-300 ${selectedAnimal.name === animal.name ? 'transform scale-110' : ''}`} />
            <span className="text-xs sm:text-sm font-medium">{animal.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimalSelector;