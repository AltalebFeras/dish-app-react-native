/**
 * Color constants for the Dishes List app
 * These colors will be displayed with color previews in VS Code
 */


export const Colors = {
  light: {
    // Primary colors
    primary: '#2e7d32',
    primaryDark: '#1b5e20',
    primaryLight: '#4caf50',
    // Secondary colors
    secondary: '#ff6f00',
    secondaryDark: '#e65100',
    secondaryLight: '#ff8f00',
    // Background colors
    background: '#ffffff',
    backgroundSecondary: '#f5f5f5',
    backgroundDark: '#e0e0e0',
    // Text colors
    text: '#333333',
    textSecondary: '#666666',
    textLight: '#999999',
    textWhite: '#ffffff',
    // UI colors
    border: '#e0e0e0',
    shadow: '#000000',
    error: '#f44336',
    warning: '#ff9800',
    success: '#4caf50',
    info: '#2196f3',
    // Card colors
    cardBackground: '#ffffff',
    cardShadow: 'rgba(0, 0, 0, 0.1)',
    // Interactive colors
    buttonPrimary: '#2e7d32',
    buttonSecondary: '#ff6f00',
    buttonDisabled: '#cccccc',
    // Status colors
    active: '#4caf50',
    inactive: '#9e9e9e',
    online: '#4caf50',
    offline: '#f44336',
    // Gradient colors
    gradientStart: '#2e7d32',
    gradientEnd: '#4caf50',
    // Transparent colors
    overlay: 'rgba(0, 0, 0, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.3)',
    // Theme colors
    backgroundTheme: '#ffffff',
    surface: '#f5f5f5',
  },
  dark: {
    // Primary colors
    primary: '#81c784',
    primaryDark: '#388e3c',
    primaryLight: '#a5d6a7',
    // Secondary colors
    secondary: '#ffb300',
    secondaryDark: '#ff6f00',
    secondaryLight: '#ffe082',
    // Background colors
    background: '#121212',
    backgroundSecondary: '#1e1e1e',
    backgroundDark: '#000000',
    // Text colors
    text: '#ffffff',
    textSecondary: '#cccccc',
    textLight: '#bbbbbb',
    textWhite: '#ffffff',
    // UI colors
    border: '#333333',
    shadow: '#000000',
    error: '#ef5350',
    warning: '#ffa726',
    success: '#66bb6a',
    info: '#29b6f6',
    // Card colors
    cardBackground: '#1e1e1e',
    cardShadow: 'rgba(0, 0, 0, 0.4)',
    // Interactive colors
    buttonPrimary: '#388e3c',
    buttonSecondary: '#ffb300',
    buttonDisabled: '#444444',
    // Status colors
    active: '#66bb6a',
    inactive: '#757575',
    online: '#66bb6a',
    offline: '#ef5350',
    // Gradient colors
    gradientStart: '#388e3c',
    gradientEnd: '#81c784',
    // Transparent colors
    overlay: 'rgba(0, 0, 0, 0.7)',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    // Theme colors
    backgroundTheme: '#121212',
    surface: '#1e1e1e',
  },
} as const;

// Color utilities
export const getColorWithOpacity = (color: string, opacity: number): string => {
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
};

// Helper to get current theme colors
export const getColors = (theme: 'light' | 'dark' = 'light') => Colors[theme];
