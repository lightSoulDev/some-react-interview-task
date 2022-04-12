import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      mainAlt: string;
      secondary: string;
      secondaryAlt: string;
    };
  }
}
