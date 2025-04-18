import { Cell, ColorSettings } from '../types';

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const generateNumbers = (size: number): number[] => {
    return Array.from({ length: size * size }, (_, i) => i + 1);
};

const assignColors = (cells: Cell[], size: number, colorSettings: ColorSettings): Cell[] => {
    if (!colorSettings.enabled) return cells;

    if (size === 7) {
        // Для 7x7: 24 червоних, 25 синіх
        const positions = shuffleArray(Array.from({ length: 49 }, (_, i) => i));
        const redCells = positions.slice(0, 24);
        const blueCells = positions.slice(24, 49);

        return cells.map((cell, index) => ({
            ...cell,
            color: redCells.includes(index) ? '#f44336' :
                   blueCells.includes(index) ? '#2196f3' :
                   undefined
        }));
    } else if (size === 9) {
        // Для 9x9: по 20-21 клітину кожного кольору
        const numbers1to20 = Array.from({ length: 20 }, (_, i) => i + 1);
        const numbers21to40 = Array.from({ length: 20 }, (_, i) => i + 21);
        const numbers41to60 = Array.from({ length: 20 }, (_, i) => i + 41);
        const numbers61to81 = Array.from({ length: 21 }, (_, i) => i + 61);

        return cells.map(cell => ({
            ...cell,
            color: numbers1to20.includes(cell.value) ? '#2196f3' : // синій
                   numbers21to40.includes(cell.value) ? '#4caf50' : // зелений
                   numbers41to60.includes(cell.value) ? '#ffeb3b' : // жовтий
                   numbers61to81.includes(cell.value) ? '#f44336' : // червоний
                   undefined
        }));
    } else if (size === 10) {
        // Для 10x10: по 25 клітин кожного кольору
        const numbers1to25 = Array.from({ length: 25 }, (_, i) => i + 1);
        const numbers26to50 = Array.from({ length: 25 }, (_, i) => i + 26);
        const numbers51to75 = Array.from({ length: 25 }, (_, i) => i + 51);
        const numbers76to100 = Array.from({ length: 25 }, (_, i) => i + 76);

        return cells.map(cell => ({
            ...cell,
            color: numbers1to25.includes(cell.value) ? '#2196f3' : // синій
                   numbers26to50.includes(cell.value) ? '#4caf50' : // зелений
                   numbers51to75.includes(cell.value) ? '#ffeb3b' : // жовтий
                   numbers76to100.includes(cell.value) ? '#f44336' : // червоний
                   undefined
        }));
    } else if (size === 8) {
        // Для 8x8: по 16 клітин кожного кольору
        const positions = shuffleArray(Array.from({ length: size * size }, (_, i) => i));
        const coloredCells = positions.slice(0, 64);
        const redCells = coloredCells.slice(0, 16);
        const blueCells = coloredCells.slice(16, 32);
        const greenCells = coloredCells.slice(32, 48);
        const yellowCells = coloredCells.slice(48, 64);

        return cells.map((cell, index) => ({
            ...cell,
            color: redCells.includes(index) ? '#f44336' :
                   blueCells.includes(index) ? '#2196f3' :
                   greenCells.includes(index) ? '#4caf50' :
                   yellowCells.includes(index) ? '#ffeb3b' :
                   undefined
        }));
    }

    return cells;
};

export const generateTable = (size: number, colorSettings: ColorSettings): Cell[] => {
    const numbers = generateNumbers(size);
    const shuffledNumbers = shuffleArray(numbers);
    const cells: Cell[] = shuffledNumbers.map(num => ({ value: num }));
    
    return assignColors(cells, size, colorSettings);
};
