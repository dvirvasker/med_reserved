import { createTheme, PaletteOptions, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline } from '@mui/material';
import { ReactNode, useContext } from 'react';
import { SiteContext } from './context/SiteContext';
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


const lightTheme: PaletteOptions = {
  mode: 'light',
  primary: {
    main: "#5FD0CA",
    dark: "#469c94",
    light: "#91e3df"
  },
  secondary: {
    main: "#FFFFFF"
  },
  info: {
    main: "#00B8D9",
    dark: "#006C9C",
    light: "#61F3F3"
  },
  success: {
    main: "#8AD827",
    dark: "#70C531",
    light: "#9DDB36"
  },
  warning: {
    main: "#EF6C00",
    light: "#ffca3a"
    // no dark
  },
  background: {
    default: "#EDEFF2",
    paper: "#F4F6F8"
  },
  text: {
    primary: "#212B36",
    secondary: "#637381",
    disabled: "#919EAB"
  },


};

const darkTheme: PaletteOptions = {
  // palette values for dark mode
  mode: 'dark',
  primary: {
    main: "#5FD0CA"
  },
  secondary: {
    main: "#FCFF60"
  },
  success: {
    main: "#00D389"
  },
  error: {
    main: "#FF5861"
  },
  warning: {
    main: "#FFBE00"
  },
  background: {
    default: "#15191E",
    paper: "#191E24"
  },
};
interface MainThemeProps {
  children: ReactNode;
}
const ThemeWrapper: React.FC<MainThemeProps> = (props) => {
  const ctx = useContext(SiteContext);
  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: 'Rubik'
    },
    palette: ctx.isInDarkMode ? darkTheme : lightTheme
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default ThemeWrapper;