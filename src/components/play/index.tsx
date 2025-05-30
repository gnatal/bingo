// app/play/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { generateBingoCard } from '../../utils/bingo';

export default function PlayPage() {
  const [card, setCard] = useState([]);
  const [maxNumber, setMaxNumber] = useState(100);
  const [cardSize, setCardSize] = useState(5);
  const [selectedCells, setSelectedCells] = useState({});
  const router = useRouter();

  // Initialize bingo card on first load
  useEffect(() => {
    generateNewGame();
  }, []);

  // Generate a new bingo card
  const generateNewGame = () => {
    const newCard = generateBingoCard(cardSize, maxNumber);
    setCard(newCard);
    setSelectedCells({}); // Reset selected cells when generating a new card
  };

  // Toggle selection of a cell
  const toggleCell = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    setSelectedCells(prev => ({
      ...prev,
      [cellKey]: !prev[cellKey]
    }));
  };

  // Check if a cell is selected
  const isCellSelected = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    return selectedCells[cellKey] || false;
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-gray-800 font-bold">Online Bingo</h1>
          <div className="space-x-4">
            <button 
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={generateNewGame}
            >
              New Card
            </button>
            <button 
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              onClick={() => router.push('/')}
            >
              Back to Menu
            </button>
          </div>
        </div>

        {/* Bingo Headers */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {['B', 'I', 'N', 'G', 'O'].map((letter) => (
            <div key={letter} className="bg-blue-500 text-white font-bold py-3 text-center text-xl rounded-t">
              {letter}
            </div>
          ))}
        </div>

        {/* Bingo Card */}
        <div className="grid grid-cols-5 gap-2 mb-8">
          {card.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`}
                onClick={() => toggleCell(rowIndex, colIndex)}
                className={`
                  aspect-square flex items-center justify-center text-2xl font-bold rounded cursor-pointer
                  border-2 border-gray-300 transition-all duration-200
                  ${isCellSelected(rowIndex, colIndex)
                    ? 'bg-blue-500 text-white border-blue-600' 
                    : cell.isFree 
                      ? 'bg-red-200 text-blue-800' 
                      : 'bg-white text-gray-800 hover:bg-blue-100'}
                `}
              >
                {cell.value}
              </div>
            ))
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">Card Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="maxNumber">
                Maximum Number
              </label>
              <input
                id="maxNumber"
                type="number"
                min="25"
                max="1000"
                value={maxNumber}
                onChange={(e) => setMaxNumber(parseInt(e.target.value) || 25)}
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="cardSize">
                Card Size
              </label>
              <select
                id="cardSize"
                value={cardSize}
                onChange={(e) => setCardSize(parseInt(e.target.value))}
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
              </select>
            </div>
          </div>
          
          <button 
            onClick={generateNewGame}
            className="w-full px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Generate New Card
          </button>
        </div>
      </div>
    </div>
  );
}