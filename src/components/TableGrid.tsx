import React from 'react';
import { Paper, Box } from '@mui/material';
import { Cell } from '../types';

interface TableGridProps {
    cells: Cell[];
    size: number;
}

const TableGrid: React.FC<TableGridProps> = ({ cells, size }) => {
    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 2,
                display: 'inline-block',
                maxWidth: '90vh', // Максимальна ширина відносно висоти екрану
                maxHeight: '90vh', // Максимальна висота відносно висоти екрану
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${size}, 1fr)`,
                    gap: 1,
                    width: '100%',
                    height: '100%',
                    aspectRatio: '1 / 1' // Зберігаємо квадратну форму
                }}
            >
                {cells.map((cell, index) => {
                    const cellSize = `calc((90vh - ${4 + size}rem) / ${size})`; // Розраховуємо розмір клітинки
                    return (
                        <Box
                            key={index}
                            sx={{
                                width: cellSize,
                                height: cellSize,
                                border: '2px solid #ccc',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: `calc(${cellSize} / 3)`, // Розмір шрифту відносно розміру клітинки
                                fontWeight: 'bold',
                                backgroundColor: cell.color || 'white',
                                color: cell.color ? 'white' : 'black',
                                userSelect: 'none'
                            }}
                        >
                            {cell.value}
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default TableGrid;
