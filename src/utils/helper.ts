
import type { TextTag } from './typings';

export function getTextProps(tag: TextTag, className?: string, type: 'default' | 'xl' | 'small' = 'default') {
    const classMap = {
      h1: {
        default: 'text-h1',
        xl: 'text-h1 desktop:text-h1-xl font-bold',
        small: ''
      },
      h2: {
        xl: '',
        small: '',
        default: 'text-h2'
      },
      h3: {
        xl: '',
        small: '',
        default: 'text-h3',
      },
      p: {
        xl: 'text-body desktop:text-body-xl',
        default: 'text-body',
        small: 'text-body-small'
      }
    };

    const classNameTag = classMap[tag][type];
  
    return {
      type: tag,
      className: `${classNameTag} ${className || ''}`
    };
}

export const colorMap = {
  background: {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary'
  }
}

export const colors: Record<string, { dark: string, light: string}> = {
  'bg-primary': {
      dark: '#1E1E1E',
      light: '#FFFDF9'
  },
  'bg-secondary': {
      dark: '#2B2B2B',
      light: '#FFFBF3'
  },
  'fg-primary': {
      dark: '#FFFDF9',
      light: '#1E1E1E'
  },
  'fg-secondary': {
      dark: '#FFFBF3',
      light: '#2B2B2B'
  },
  'fg-shadow': {
      dark: 'rgb(255 253 249 / 0.4)',
      light: 'rgb(30 30 30 / 0.4)'
  },
  'clr-primary': {
      dark: '#8AC7FF',
      light: '#1990FF'
  }
}