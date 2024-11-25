import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E31B54',
      light: '#FF4081',
      dark: '#C2185B',
    },
    secondary: {
      main: '#FFB74D',
      light: '#FFE0B2',
      dark: '#FF9800',
    },
    background: {
      default: '#FFF8F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C1810',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#E31B54',
          borderBottom: '1px solid rgba(227, 27, 84, 0.12)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          fontFamily: '"Playfair Display", serif',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgb(227 27 84 / 0.1), 0 2px 4px -2px rgb(227 27 84 / 0.06)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 6px -1px rgb(227 27 84 / 0.1), 0 2px 4px -2px rgb(227 27 84 / 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"Playfair Display", serif',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Playfair Display", serif',
          '&.Mui-selected': {
            backgroundColor: '#FFE0B2',
            color: '#E31B54',
            '&:hover': {
              backgroundColor: '#FFD180',
            },
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(227 27 84 / 0.05)',
    '0 1px 3px 0 rgb(227 27 84 / 0.1), 0 1px 2px -1px rgb(227 27 84 / 0.1)',
    '0 4px 6px -1px rgb(227 27 84 / 0.1), 0 2px 4px -2px rgb(227 27 84 / 0.1)',
    '0 10px 15px -3px rgb(227 27 84 / 0.1), 0 4px 6px -4px rgb(227 27 84 / 0.1)',
    '0 20px 25px -5px rgb(227 27 84 / 0.1), 0 8px 10px -6px rgb(227 27 84 / 0.1)',
    '0 25px 50px -12px rgb(227 27 84 / 0.25)',
    ...Array(18).fill('none'),
  ],
});

export default theme;