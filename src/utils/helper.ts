
import type { TextTag } from './typings';

export function getTextProps(tag: TextTag, className?: string) {
    const classMap = {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      p: 'text-p'
    };
  
    return {
      type: tag,
      className: `font-americano ${classMap[tag]} ${className || ''}`
    };
}