// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    const difficulty = request.query?.difficulty ?? "";
    const sudokuBoard = generateBoard();
    var minMissing: number;
    switch (difficulty) {
        case "easy":
            minMissing = 40 + Math.floor(Math.random() * 5);
            break;
        case "medium":
            minMissing = 50 + Math.floor(Math.random() * 5);
            break;
        case "hard":
            minMissing = 60 + Math.floor(Math.random() * 5);
            break;
        case "expert":
            minMissing = 70 + Math.floor(Math.random() * 5);
            break;
        default:
            minMissing = 30 + Math.floor(Math.random() * 5);
            break;
    }
    let count = 0;
    while (count < minMissing) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (sudokuBoard[row][col] !== null) {
            sudokuBoard[row][col] = null;
            count++;
        }
    }
    return response.status(200).json({ board: sudokuBoard });
}

const generateBoard = (): (number | null)[][] => {
    const board: (number | null)[][] = new Array(9)
        .fill(null)
        .map(() => new Array(9).fill(null));
    fillBoard(board);
    return board;
};

const fillBoard = (board: (number | null)[][]): boolean => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true; // Board is fully filled

    const [row, col] = emptyCell;
    const digits = shuffle(Array.from({ length: 9 }, (_, i) => i + 1));

    for (const digit of digits) {
        if (isValid(board, row, col, digit)) {
            board[row][col] = digit;
            if (fillBoard(board)) return true;
            board[row][col] = null; // Backtrack
        }
    }

    return false; // No valid number found, trigger backtracking
};

const findEmptyCell = (board: (number | null)[][]): [number, number] | null => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === null) return [i, j];
        }
    }
    return null;
};

const isValid = (
    board: (number | null)[][],
    row: number,
    col: number,
    digit: number
): boolean => {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === digit || board[i][col] === digit) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === digit) return false;
        }
    }

    return true;
};

const shuffle = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

