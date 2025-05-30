// app/cards/page.js
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { generateMultipleCards } from "../../utils/bingo";
import { useReactToPrint } from "react-to-print";

export default function CardsPage() {
  const [numCards, setNumCards] = useState(20);
  const [maxNumber, setMaxNumber] = useState(100);
  const [cardSize, setCardSize] = useState(5);
  const [cards, setCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const printRef = useRef(null);
  const router = useRouter();

  const generateCards = () => {
    const generatedCards = generateMultipleCards(numCards, cardSize, maxNumber);
    setCards(generatedCards);
    setShowCards(true);
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Bingo_Cards",
  });

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-gray-800 font-bold">Generate Bingo Cards</h1>
          <button
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => router.push("/")}
          >
            Back to Menu
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">Card Settings</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="numCards">
                Number of Cards
              </label>
              <input
                id="numCards"
                type="number"
                min="1"
                max="100"
                value={numCards}
                onChange={(e) => setNumCards(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>

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
                className="w-full px-3 py-2  text-gray-700 border rounded focus:outline-none focus:ring focus:border-blue-300"
              >
                <option value="3">3x3</option>
                <option value="4">4x4</option>
                <option value="5">5x5</option>
                <option value="6">6x6</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={generateCards}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Generate Cards
            </button>

            {showCards && (
              <button
                onClick={handlePrint}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Print Cards
              </button>
            )}
          </div>
        </div>

        {showCards && (
          <div className="print-container" ref={printRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
              {cards.map((card, cardIndex) => (
                <div
                  key={cardIndex}
                  className="bg-white border rounded shadow-sm p-4 print:break-inside-avoid"
                >
                  <h3 className="text-center font-bold text-gray-800 text-lg mb-4">
                    BINGO CARD #{cardIndex + 1}
                  </h3>

                  <div
                    className={`grid grid-cols-${cardSize} gap-2`}
                    style={{
                      gridTemplateColumns: `repeat(${cardSize}, minmax(0, 1fr))`,
                    }}
                  >
                    {card.map((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                        <div
                          key={`${rowIndex}-${cellIndex}`}
                          className={`
                            aspect-square flex items-center justify-center   text-center p-1 text-lg font-semibold rounded border border-black
                            ${cell.isFree ? "bg-red-200 text-blue-800" : "bg-white text-gray-800"}
                          `}
                        >
                          {cell.value}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
