import React from 'react';
import { 
    FormControlLabel, 
    Switch, 
    Paper
} from '@mui/material';
import { ColorSettings as ColorSettingsType } from '../types';

interface ColorSettingsProps {
    settings: ColorSettingsType;
    onSettingsChange: (settings: ColorSettingsType) => void;
    tableSize: number;
}

const ColorSettings: React.FC<ColorSettingsProps> = ({
    settings,
    onSettingsChange
}) => {
    const handleColorModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSettingsChange({
            ...settings,
            enabled: event.target.checked
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 1, mb: 2 }}>
            <FormControlLabel
                control={
                    <Switch
                        checked={settings.enabled}
                        onChange={handleColorModeChange}
                    />
                }
                label="Увімкнути кольоровий режим"
            />
        </Paper>
    );
};

export default ColorSettings;
