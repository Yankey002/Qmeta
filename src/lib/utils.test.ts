import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('a', 'b')).toBe('a b');
      expect(cn('a', { b: true })).toBe('a b');
      expect(cn('a', { b: false })).toBe('a');
      expect(cn('a', null, undefined, 'b')).toBe('a b');
    });

    it('should handle empty values correctly', () => {
      expect(cn()).toBe('');
      expect(cn(null, undefined)).toBe('');
      expect(cn({})).toBe('');
    });

    it('should handle multiple conditional classes', () => {
      expect(cn('base', { active: true, disabled: false, hidden: true })).toBe(
        'base active hidden'
      );
    });
  });
});
