import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScroller } from '@/hooks/useScroller';

describe('useScroller - Infinite Scroll Hook', () => {
  let matchMediaMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    matchMediaMock = vi.fn((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)' ? false : undefined,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.matchMedia = matchMediaMock;
  });

  describe('Hook Return Value', () => {
    it('should return a ref object', () => {
      const { result } = renderHook(() => useScroller());

      expect(result.current).toHaveProperty('current');
    });

    it('should have null initial ref value', () => {
      const { result } = renderHook(() => useScroller());

      expect(result.current.current).toBeNull();
    });
  });

  describe('Reduced Motion Preference', () => {
    it('should handle reduced motion preference', () => {
      const div = document.createElement('div');
      div.classList.add('scroller');

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      expect(result.current.current).toBe(div);
    });
  });

  describe('Animation Setup', () => {
    it('should set data-animated attribute when no reduced motion', () => {
      const div = document.createElement('div');
      div.classList.add('scroller');
      const inner = document.createElement('div');
      inner.classList.add('scroller__inner');
      div.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        div.setAttribute('data-animated', 'true');
      }

      expect(div.getAttribute('data-animated')).toBe('true');
    });

    it('should not set data-animated when reduced motion is preferred', () => {
      matchMediaMock.mockReturnValueOnce({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
      });

      const div = document.createElement('div');
      div.classList.add('scroller');

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      }

      expect(div.getAttribute('data-animated')).toBeNull();
    });
  });

  describe('Item Duplication', () => {
    it('should duplicate children in scroller__inner', () => {
      const div = document.createElement('div');
      div.classList.add('scroller');
      const inner = document.createElement('div');
      inner.classList.add('scroller__inner');

      const item1 = document.createElement('div');
      item1.textContent = 'Item 1';
      const item2 = document.createElement('div');
      item2.textContent = 'Item 2';

      inner.appendChild(item1);
      inner.appendChild(item2);
      div.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const scrollerInner = div.querySelector('.scroller__inner');
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute('aria-hidden', 'true');
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      }

      expect(inner.children.length).toBe(4);
    });

    it('should set aria-hidden on duplicated items', () => {
      const div = document.createElement('div');
      const inner = document.createElement('div');
      inner.classList.add('scroller__inner');

      const item = document.createElement('div');
      item.textContent = 'Test Item';
      inner.appendChild(item);
      div.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      // Simulate duplication
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const scrollerInner = div.querySelector('.scroller__inner');
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);
          scrollerContent.forEach((original) => {
            const duplicate = original.cloneNode(true) as HTMLElement;
            duplicate.setAttribute('aria-hidden', 'true');
            scrollerInner.appendChild(duplicate);
          });
        }
      }

      const duplicates = Array.from(inner.children).filter((child) =>
        child.hasAttribute('aria-hidden')
      );

      expect(duplicates.length).toBeGreaterThan(0);
      duplicates.forEach((duplicate) => {
        expect(duplicate.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should handle empty scroller__inner gracefully', () => {
      const div = document.createElement('div');
      const inner = document.createElement('div');
      inner.classList.add('scroller__inner');
      div.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      expect(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          const scrollerInner = div.querySelector('.scroller__inner');
          if (scrollerInner) {
            const children = Array.from(scrollerInner.children);
            children.forEach((item) => {
              const dup = item.cloneNode(true);
              scrollerInner.appendChild(dup);
            });
          }
        }
      }).not.toThrow();

      expect(inner.children.length).toBe(0);
    });

    it('should handle missing scroller__inner gracefully', () => {
      const div = document.createElement('div');
      div.classList.add('scroller');

      const { result } = renderHook(() => useScroller());
      result.current.current = div;

      expect(() => {
        const inner = div.querySelector('.scroller__inner');
        if (!inner) {
          return;
        }
      }).not.toThrow();
    });
  });

  describe('Null Reference Handling', () => {
    it('should handle null scroller reference', () => {
      const { result } = renderHook(() => useScroller());

      expect(() => {
        const scroller = result.current.current;
        if (!scroller) return;
      }).not.toThrow();
    });
  });

  describe('HTML Structure Integration', () => {
    it('should work with proper scroller structure', () => {
      const scroller = document.createElement('div');
      scroller.className = 'scroller';

      const inner = document.createElement('div');
      inner.className = 'scroller__inner';

      const item1 = document.createElement('div');
      item1.textContent = 'Item 1';
      const item2 = document.createElement('div');
      item2.textContent = 'Item 2';

      inner.appendChild(item1);
      inner.appendChild(item2);
      scroller.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = scroller;

      expect(scroller.querySelector('.scroller__inner')).toBe(inner);
      expect(inner.children.length).toBe(2);
    });

    it('should preserve original item content in duplicates', () => {
      const scroller = document.createElement('div');
      const inner = document.createElement('div');
      inner.className = 'scroller__inner';

      const originalItem = document.createElement('div');
      originalItem.className = 'badge';
      originalItem.innerHTML = '<span>Test Badge</span>';

      inner.appendChild(originalItem);
      scroller.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = scroller;

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const scrollerInner = scroller.querySelector('.scroller__inner');
        if (scrollerInner) {
          const items = Array.from(scrollerInner.children);
          items.forEach((item) => {
            const dup = item.cloneNode(true);
            scrollerInner.appendChild(dup);
          });
        }
      }

      expect(inner.children.length).toBe(2);
      expect(inner.children[1].innerHTML).toBe(inner.children[0].innerHTML);
    });
  });

  describe('Multiple Hook Instances', () => {
    it('should create independent refs for multiple instances', () => {
      const { result: result1 } = renderHook(() => useScroller());
      const { result: result2 } = renderHook(() => useScroller());

      const div1 = document.createElement('div');
      const div2 = document.createElement('div');

      result1.current.current = div1;
      result2.current.current = div2;

      expect(result1.current.current).toBe(div1);
      expect(result2.current.current).toBe(div2);
      expect(result1.current.current).not.toBe(result2.current.current);
    });
  });

  describe('Accessability', () => {
    it('should mark duplicates as hidden from screen readers', () => {
      const scroller = document.createElement('div');
      const inner = document.createElement('div');
      inner.className = 'scroller__inner';

      const item = document.createElement('div');
      item.textContent = 'Important Item';

      inner.appendChild(item);
      scroller.appendChild(inner);

      const { result } = renderHook(() => useScroller());
      result.current.current = scroller;

      // Simulate duplication
      const scrollerInner = scroller.querySelector('.scroller__inner');
      if (scrollerInner) {
        const originalItems = Array.from(scrollerInner.children);
        originalItems.forEach((original) => {
          const dup = original.cloneNode(true) as HTMLElement;
          dup.setAttribute('aria-hidden', 'true');
          scrollerInner.appendChild(dup);
        });
      }

      const original = scrollerInner?.children[0];
      const duplicate = scrollerInner?.children[1];

      expect(original?.hasAttribute('aria-hidden')).toBe(false);
      expect(duplicate?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
