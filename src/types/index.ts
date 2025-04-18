export interface TableSettings {
    size: number;
    colorMode: boolean;
    isRunning: boolean;
}

export interface Cell {
    value: number;
    color?: string;
}

export interface TimerData {
    time: number;
    isRunning: boolean;
}

export interface ColorSettings {
    enabled: boolean;
    colors: {
        red: number;
        blue: number;
        green?: number;
        yellow?: number;
    };
}
