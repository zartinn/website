
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

export const colors = {
  background: {
    primary: 'bg-bg-primary',
    secondary: 'bg-bg-secondary'
  }
}