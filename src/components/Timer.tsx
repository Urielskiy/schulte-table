import React, { useEffect } from 'react';
import { Typography, Paper } from '@mui/material';
import { TimerData } from '../types';

interface TimerProps {
    timerData: TimerData;
    onTick: () => void;
}

const Timer: React.FC<TimerProps> = ({ timerData, onTick }) => {
    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (timerData.isRunning) {
            interval = setInterval(() => {
                onTick();
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [timerData.isRunning, onTick]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h4" component="div">
                {formatTime(timerData.time)}
            </Typography>
        </Paper>
    );
};

export default Timer;
