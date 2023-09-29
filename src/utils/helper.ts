
import type { TextTag } from './typings';

export function getTextProps(tag: TextTag, className?: string) {
    const classMap = {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      p: 'text-body'
    };
  
    return {
      type: tag,
      className: `${classMap[tag]} ${className || ''}`
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