import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

/**
 * Paleta de marca Skold — calor nórdico.
 * primary = brasa/ember (naranja fuego), superficies en tonos hierro fundido y crema.
 */
export const SkoldPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fdf3ee',
      100: '#fbe1d3',
      200: '#f6bd9c',
      300: '#f09766',
      400: '#ec7740',
      500: '#e2571e', // brasa
      600: '#c84515',
      700: '#a43712',
      800: '#7f2c12',
      900: '#682611',
      950: '#391107'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f7f3ec',
          100: '#efe7d9',
          200: '#e2d4bf',
          300: '#cdb89c',
          400: '#a8916f',
          500: '#80715a',
          600: '#5c5145',
          700: '#403933',
          800: '#2a2521',
          900: '#1a1614',
          950: '#100d0b'
        },
        primary: {
          color: '#c84515',
          contrastColor: '#ffffff',
          hoverColor: '#a43712',
          activeColor: '#7f2c12'
        }
      }
    }
  }
});
