import React, { useState, useCallback, useEffect } from 'react';
import { Container, Typography, Box, Divider } from '@mui/material';
import Instructions from './components/Instructions';
import SelectPanel from './components/SelectPanel';
import ColorSettings from './components/ColorSettings';
import TableGrid from './components/TableGrid';
import Timer from './components/Timer';
import History, { HistoryEntry } from './components/History';
import { generateTable } from './utils/tableGenerator';
import { TableSettings, ColorSettings as ColorSettingsType, Cell, TimerData } from './types';

function App() {
  const [settings, setSettings] = useState<TableSettings>({
    size: 4,
    colorMode: false,
    isRunning: false
  });

  const [colorSettings, setColorSettings] = useState<ColorSettingsType>({
    enabled: false,
    colors: {
      red: 24,
      blue: 25
    }
  });

  const [cells, setCells] = useState<Cell[]>([]);
  const [timerData, setTimerData] = useState<TimerData>({
    time: 0,
    isRunning: false
  });

  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const saved = localStorage.getItem('schulteHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const generateNewTable = useCallback(() => {
    const newCells = generateTable(settings.size, colorSettings);
    setCells(newCells);
  }, [settings.size, colorSettings]);

  const handleSettingsChange = (newSettings: TableSettings) => {
    setSettings(newSettings);
    if (newSettings.size < 7) {
      setColorSettings(prev => ({ ...prev, enabled: false }));
    }
  };

  const handleStartStop = () => {
    if (timerData.isRunning) {
      // Зупинка таймера - зберігаємо результат
      setHistory(prev => [
        {
          size: settings.size,
          time: timerData.time,
          date: new Date()
        },
        ...prev
      ]);
    }
    setSettings(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
    setTimerData(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const handleTimerTick = () => {
    setTimerData(prev => ({
      ...prev,
      time: prev.time + 1
    }));
  };

  const handleReset = () => {
    setTimerData({
      time: 0,
      isRunning: false
    });
    setSettings(prev => ({
      ...prev,
      isRunning: false
    }));
    generateNewTable();
  };



  // Зберігаємо історію в localStorage
  useEffect(() => {
    localStorage.setItem('schulteHistory', JSON.stringify(history));
  }, [history]);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Таблиця Шульте
      </Typography>

      {cells.length === 0 ? (
        // Показуємо інструкції та панель налаштувань
        <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Instructions />
          </Box>

          <Box sx={{ 
            width: '250px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            alignItems: 'stretch'
          }}>
            <SelectPanel
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onGenerate={handleReset}
              onStartStop={handleStartStop}
            />

            {settings.size >= 7 && (
              <ColorSettings
                settings={colorSettings}
                onSettingsChange={setColorSettings}
                tableSize={settings.size}
              />
            )}
          </Box>
        </Box>
      ) : (
        // Показуємо таблицю та панель керування
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <TableGrid cells={cells} size={settings.size} />
          </Box>

          <Box sx={{ 
            width: '250px',
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            alignItems: 'stretch'
          }}>
            <Timer timerData={timerData} onTick={handleTimerTick} />
            
            <SelectPanel
              settings={settings}
              onSettingsChange={handleSettingsChange}
              onGenerate={handleReset}
              onStartStop={handleStartStop}
            />

            {settings.size >= 7 && (
              <ColorSettings
                settings={colorSettings}
                onSettingsChange={setColorSettings}
                tableSize={settings.size}
              />
            )}

            <Divider />

            <History 
              entries={history}
              onReset={() => {
                setHistory([]);
                localStorage.removeItem('schulteHistory');
              }}
            />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
