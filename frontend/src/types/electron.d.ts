import 'react';

declare module 'react' {
    interface CSSProperties {
        WebkitAppRegion?: 'drag' | 'no-drag';
    }
}

declare global {
    interface Window {
        electronAPI?: {
            minimize: () => void;
            maximize: () => void;
            close: () => void;
        };
    }
}

export {};
