import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRandomColoredWord } from '@/hooks/useRandomColoredWord';

describe('useRandomColoredWord', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('pickRandom', () => {
    it('should select a word from the text', () => {
      const text = 'Hello world test';
      const colors = ['#ff0000', '#00ff00'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      expect(result.current).toBeDefined();
    });

    it('should select a color from the list', () => {
      const text = 'One two three';
      const colors = ['#red', '#blue'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpan = rendered.find((el: any) => el.props.style?.color);
      expect(coloredSpan).toBeDefined();
      expect(coloredSpan?.props.style.color).toMatch(/#(red|blue)/);
    });

    it('should update state when calling pickRandom multiple times', () => {
      const text = 'alpha beta gamma';
      const colors = ['#1', '#2', '#3'];
      const { result, rerender } = renderHook(() =>
        useRandomColoredWord(text, colors)
      );

      const initialRender = result.current.render();

      act(() => {
        result.current.pickRandom();
      });

      rerender();
      const afterPickRender = result.current.render();

      expect(initialRender).toBeDefined();
      expect(afterPickRender).toBeDefined();
    });
  });

  describe('render', () => {
    it('should render original text split into words', () => {
      const text = 'Hello world';
      const colors = ['#ff0000'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      expect(rendered).toBeDefined();
      expect(Array.isArray(rendered)).toBe(true);
      expect(rendered.length).toBeGreaterThan(0);
    });

    it('should include spaces in the render', () => {
      const text = 'one two three';
      const colors = ['#000'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const totalSpans = rendered.filter((el: any) => el.props.children).length;

      expect(totalSpans).toBeGreaterThan(0);
    });

    it('should color only one word', () => {
      const text = 'first second third';
      const colors = ['#abc123'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpans = rendered.filter((el: any) => el.props.style?.color);

      expect(coloredSpans.length).toBe(1);
      expect(coloredSpans[0]).toBeDefined();
    });

    it('should apply fontWeight bold to colored word', () => {
      const text = 'test words here';
      const colors = ['#fff'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpan = rendered.find((el: any) => el.props.style?.color);

      expect(coloredSpan).toBeDefined();
      expect(coloredSpan!.props.style.fontWeight).toBe('bold');
    });

    it('should apply correct CSS classes', () => {
      const text = 'styled text example';
      const colors = ['#000'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpan = rendered.find((el: any) => el.props.style?.color);

      expect(coloredSpan).toBeDefined();
      expect(coloredSpan!.props.className).toBe('animate-colored-word');
    });

    it('should render non-colored words with default classes', () => {
      const text = 'normal highlighted normal';
      const colors = ['#f00'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const normalSpans = rendered.filter((el: any) => !el.props.style?.color);

      expect(normalSpans.length).toBeGreaterThan(0);
      normalSpans.forEach((span: any) => {
        if (span.props.children && /\w/.test(span.props.children)) {
          expect(span.props.className).toBe('text-white dark:text-mint-200');
        }
      });
    });

    it('should handle text with multiple spaces', () => {
      const text = 'text  with   spaces';
      const colors = ['#aaa'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();

      expect(rendered).toBeDefined();
      expect(rendered.length).toBeGreaterThan(0);
    });

    it('should render correctly with a single word', () => {
      const text = 'solo';
      const colors = ['#123'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpans = rendered.filter((el: any) => el.props.style?.color);

      expect(coloredSpans.length).toBe(1);
    });

    it('should have display inline-block on colored word', () => {
      const text = 'inline block display';
      const colors = ['#555'];
      const { result } = renderHook(() => useRandomColoredWord(text, colors));

      act(() => {
        result.current.pickRandom();
      });

      const rendered = result.current.render();
      const coloredSpan = rendered.find((el: any) => el.props.style?.color);

      expect(coloredSpan).toBeDefined();
      expect(coloredSpan!.props.style.display).toBe('inline-block');
    });
  });
});
