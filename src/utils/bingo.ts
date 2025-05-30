// app/utils/bingoUtils.js

/**
 * Generates a random bingo card with the specified size and maximum number
 * @param {number} size - The size of the bingo card (e.g., 5 for a 5x5 card)
 * @param {number} maxNumber - The maximum number that can appear on the card
 * @returns {Array} - 2D array representing the bingo card
 */
export function generateBingoCard(size = 5, maxNumber = 100) {
    // Create a pool of available numbers
    const availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    
    // Shuffle the available numbers
    shuffleArray(availableNumbers);
    
    // Create the bingo card as a 2D array
    const card = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // If we want a free space in the middle
        if (i === Math.floor(size / 2) && j === Math.floor(size / 2) && size % 2 === 1) {
          row.push({ value: "FREE", isFree: true });
        } else {
          // Pop a number from the available numbers
          const number = availableNumbers.pop();
          row.push({ value: number, marked: false });
        }
      }
      card.push(row);
    }
    
    return card;
  }
  
  /**
   * Generates multiple unique bingo cards
   * @param {number} count - Number of cards to generate
   * @param {number} size - Size of each card
   * @param {number} maxNumber - Maximum number for the cards
   * @returns {Array} - Array of bingo cards
   */
  export function generateMultipleCards(count, size = 5, maxNumber = 100) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(generateBingoCard(size, maxNumber));
    }
    return cards;
  }
  
  /**
   * Shuffles an array in-place using Fisher-Yates algorithm
   * @param {Array} array - The array to shuffle
   */
  export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  /**
   * Flattens a 2D bingo card into a 1D array
   * @param {Array} card - 2D bingo card
   * @returns {Array} - Flattened 1D array
   */
  export function flattenCard(card) {
    return card.flat();
  }
  
  /**
   * Creates a grid of numbers from 1 to maxNumber
   * @param {number} maxNumber - The maximum number
   * @returns {Array} - Array of number objects with value and marked properties
   */
  export function createNumberGrid(maxNumber = 100) {
    return Array.from({ length: maxNumber }, (_, i) => ({
      value: i + 1,
      marked: false
    }));
  }