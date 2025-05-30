"use client"
import { useState, useEffect } from 'react';

const BingoGame = () => {
  const [board, setBoard] = useState([]);
  const [selectedCells, setSelectedCells] = useState({});
  const [hasWon, setHasWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [lastCalledNumber, setLastCalledNumber] = useState(null);
  const [bingoTitle, setBingoTitle] = useState('BINGO');
  const [freeSpace, setFreeSpace] = useState(true);

  // Function to create a random bingo board
  const generateBoard = () => {
    const columns = {
      B: generateRandomNumbers(1, 20, 5),
      I: generateRandomNumbers(21, 40, 5),
      N: generateRandomNumbers(41, 60, 5),
      G: generateRandomNumbers(61, 80, 5),
      O: generateRandomNumbers(81, 100, 5)
    };

    // Create board
    const newBoard = [];
    for (let i = 0; i < 5; i++) {
      const row = [
        { letter: 'B', number: columns.B[i] },
        { letter: 'I', number: columns.I[i] },
        { letter: 'N', number: columns.N[i] },
        { letter: 'G', number: columns.G[i] },
        { letter: 'O', number: columns.O[i] }
      ];
      newBoard.push(row);
    }

    // Set the middle cell as free space if enabled
    if (freeSpace) {
      newBoard[2][2] = { letter: 'N', number: 'FREE', isFree: true };
    }

    return newBoard;
  };

  // Generate random numbers for each column
  const generateRandomNumbers = (min, max, count) => {
    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  };

  // Start a new game
  const startNewGame = () => {
    const newBoard = generateBoard();
    setBoard(newBoard);
    setSelectedCells({});
    setHasWon(false);
    setGameStarted(true);
    setCalledNumbers([]);
    setLastCalledNumber(null);
  };

  // Toggle cell selection
  const toggleCell = (rowIndex, colIndex) => {
    if (!gameStarted || hasWon) return;

    const cellKey = `${rowIndex}-${colIndex}`;
    const newSelectedCells = { ...selectedCells };

    if (selectedCells[cellKey]) {
      delete newSelectedCells[cellKey];
    } else {
      newSelectedCells[cellKey] = true;
    }

    setSelectedCells(newSelectedCells);
  };

  // Call a random number
  const callNumber = () => {
    if (!gameStarted || hasWon) return;

    // Create a pool of numbers that haven't been called yet
    const availableNumbers = [];
    for (let i = 1; i <= 75; i++) {
      if (!calledNumbers.includes(i)) {
        availableNumbers.push(i);
      }
    }

    if (availableNumbers.length === 0) {
      alert("All numbers have been called!");
      return;
    }

    // Select a random number from the available pool
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const calledNumber = availableNumbers[randomIndex];
    
    // Add to called numbers
    const newCalledNumbers = [...calledNumbers, calledNumber];
    setCalledNumbers(newCalledNumbers);
    setLastCalledNumber(calledNumber);
  };

  // Check if player has won
  useEffect(() => {
    if (!gameStarted || Object.keys(selectedCells).length < 5) return;

    // Check rows
    for (let row = 0; row < 5; row++) {
      let rowComplete = true;
      for (let col = 0; col < 5; col++) {
        const cellKey = `${row}-${col}`;
        if (!selectedCells[cellKey] && !(freeSpace && row === 2 && col === 2)) {
          rowComplete = false;
          break;
        }
      }
      if (rowComplete) {
        setHasWon(true);
        return;
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      let colComplete = true;
      for (let row = 0; row < 5; row++) {
        const cellKey = `${row}-${col}`;
        if (!selectedCells[cellKey] && !(freeSpace && row === 2 && col === 2)) {
          colComplete = false;
          break;
        }
      }
      if (colComplete) {
        setHasWon(true);
        return;
      }
    }

    // Check diagonals
    let diag1Complete = true;
    let diag2Complete = true;
    for (let i = 0; i < 5; i++) {
      const diag1Key = `${i}-${i}`;
      const diag2Key = `${i}-${4 - i}`;
      
      if (!selectedCells[diag1Key] && !(freeSpace && i === 2)) {
        diag1Complete = false;
      }
      if (!selectedCells[diag2Key] && !(freeSpace && i === 2)) {
        diag2Complete = false;
      }
    }
    
    if (diag1Complete || diag2Complete) {
      setHasWon(true);
    }
  }, [selectedCells, gameStarted, freeSpace]);

  // Get the letter for a called number
  const getLetterForNumber = (number) => {
    if (number >= 1 && number <= 15) return 'B';
    if (number >= 16 && number <= 30) return 'I';
    if (number >= 31 && number <= 45) return 'N';
    if (number >= 46 && number <= 60) return 'G';
    if (number >= 61 && number <= 75) return 'O';
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Online Bingo</h1>
        
        {/* Game controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button 
            onClick={startNewGame}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            New Game
          </button>
          
          <button 
            onClick={callNumber}
            disabled={!gameStarted || hasWon}
            className={`${gameStarted && !hasWon ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'} text-white font-bold py-2 px-4 rounded`}
          >
            Call Number
          </button>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="freeSpace" 
              checked={freeSpace} 
              onChange={() => setFreeSpace(!freeSpace)}
              className="w-4 h-4"
            />
            <label htmlFor="freeSpace">Free Space</label>
          </div>
          
          <input 
            type="text" 
            value={bingoTitle} 
            onChange={(e) => setBingoTitle(e.target.value)}
            className="border rounded px-2 py-1 w-32"
            maxLength={5}
          />
        </div>
        
        {/* Called number display */}
        {gameStarted && (
          <div className="mb-6 text-center">
            <div className="text-xl font-bold mb-2">
              Last called: {lastCalledNumber ? `${getLetterForNumber(lastCalledNumber)}-${lastCalledNumber}` : 'None'}
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-h-32 overflow-y-auto p-2 border rounded">
              {calledNumbers.sort((a, b) => a - b).map((num) => (
                <span key={num} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold">
                  {getLetterForNumber(num)}-{num}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Win notification */}
        {hasWon && (
          <div className="bg-yellow-100 border-yellow-400 border-2 text-yellow-800 p-4 mb-6 rounded text-center text-xl font-bold animate-pulse">
            BINGO! You've won!
          </div>
        )}
        
        {/* Bingo board */}
        {gameStarted && (
          <div className="flex flex-col items-center">
            {/* Column headers */}
            <div className="grid grid-cols-5 gap-2 mb-2 w-full max-w-md">
              {bingoTitle.split('').map((letter, index) => (
                <div key={index} className="bg-blue-500 text-white font-bold py-2 text-center rounded">
                  {letter}
                </div>
              ))}
            </div>
            
            {/* Bingo cells */}
            <div className="grid grid-cols-5 gap-2 w-full max-w-md">
              {board.map((row, rowIndex) => (
                row.map((cell, colIndex) => {
                  const isFree = cell.isFree;
                  const isSelected = selectedCells[`${rowIndex}-${colIndex}`] || isFree;
                  
                  return (
                    <div 
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => toggleCell(rowIndex, colIndex)}
                      className={`
                        aspect-square flex items-center justify-center text-lg font-medium rounded cursor-pointer
                        ${isSelected ? 'bg-red-500 text-white' : 'bg-white border border-gray-300'}
                        transition-colors duration-200 hover:bg-red-200
                      `}
                    >
                      {cell.number}
                    </div>
                  );
                })
              ))}
            </div>
          </div>
        )}
        
        {!gameStarted && (
          <div className="text-center text-gray-600 py-8">
            Click "New Game" to generate a bingo board and start playing!
          </div>
        )}
      </div>
    </div>
  );
};

export default BingoGame;