import React from 'react';
import { Paper, Typography, Button, Stack, Box } from '@mui/material';

export interface HistoryEntry {
    size: number;
    time: number;
    date: Date;
}

interface HistoryProps {
    entries: HistoryEntry[];
    onReset: () => void;
}

const History: React.FC<HistoryProps> = ({ entries, onReset }) => {
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const calculateAverage = (): string => {
        if (entries.length === 0) return '00:00';
        const totalTime = entries.reduce((sum, entry) => sum + entry.time, 0);
        return formatTime(Math.floor(totalTime / entries.length));
    };

    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Stack spacing={1}>
                <Typography variant="subtitle1" gutterBottom>
                    Історія результатів
                </Typography>
                
                <Box sx={{ 
                    maxHeight: '150px', 
                    overflowY: 'auto',
                    mb: 1,
                    '&::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bdbdbd',
                        borderRadius: '4px'
                    }
                }}>
                    {entries.map((entry, index) => (
                        <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                            {`${entry.size}x${entry.size} - ${formatTime(entry.time)}`}
                        </Typography>
                    ))}
                </Box>

                <Typography variant="subtitle2">
                    Середній час: {calculateAverage()}
                </Typography>

                <Button 
                    variant="outlined" 
                    color="error" 
                    size="small"
                    onClick={onReset}
                    fullWidth
                >
                    Обнулити історію
                </Button>
            </Stack>
        </Paper>
    );
};

export default History;
