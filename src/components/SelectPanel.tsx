import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Stack } from '@mui/material';
import { TableSettings } from '../types';

interface SelectPanelProps {
    settings: TableSettings;
    onSettingsChange: (settings: TableSettings) => void;
    onGenerate: () => void;
    onStartStop: () => void;
}

const SelectPanel: React.FC<SelectPanelProps> = ({
    settings,
    onSettingsChange,
    onGenerate,
    onStartStop
}) => {
    const handleSizeChange = (event: any) => {
        const newSize = event.target.value;
        onSettingsChange({
            ...settings,
            size: newSize,
            colorMode: newSize >= 7
        });
        onGenerate(); // Автоматично генеруємо нову таблицю при зміні розміру
    };

    return (
        <Stack direction="column" spacing={2}>
            <FormControl fullWidth size="small">
                <InputLabel>Розмір</InputLabel>
                <Select
                    value={settings.size}
                    label="Розмір"
                    onChange={handleSizeChange}
                    size="small"
                >
                    {[4, 5, 6, 7, 8, 9, 10].map((size) => (
                        <MenuItem key={size} value={size}>{`${size}x${size}`}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                onClick={onGenerate}
                size="small"
                fullWidth
            >
                Згенерувати
            </Button>
            <Button
                variant="contained"
                color={settings.isRunning ? "error" : "success"}
                onClick={onStartStop}
                size="small"
                fullWidth
            >
                {settings.isRunning ? "Стоп" : "Старт"}
            </Button>
        </Stack>
    );
};

export default SelectPanel;
