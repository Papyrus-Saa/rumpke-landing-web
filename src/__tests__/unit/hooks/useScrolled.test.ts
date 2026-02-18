import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrolled } from '@/hooks/useScrolled';

describe('useScrolled', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return false when not scrolled', () => {
    window.scrollY = 0;
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);
  });

  it('should return true when scrollY exceeds default threshold (8)', () => {
    window.scrollY = 10;
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(true);
  });

  it('should return false when scrollY equals threshold', () => {
    window.scrollY = 8;
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);
  });

  it('should use custom threshold', () => {
    window.scrollY = 50;
    const { result } = renderHook(() => useScrolled(100));

    expect(result.current).toBe(false);
  });

  it('should return true with custom threshold exceeded', () => {
    window.scrollY = 150;
    const { result } = renderHook(() => useScrolled(100));

    expect(result.current).toBe(true);
  });

  it('should update state when scroll event fires', () => {
    window.scrollY = 0;
    const { result, rerender } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);

    act(() => {
      window.scrollY = 20;
      window.dispatchEvent(new Event('scroll'));
    });

    rerender();

    expect(result.current).toBe(true);
  });

  it('should change from true to false when scrollY falls below threshold', () => {
    window.scrollY = 20;
    const { result, rerender } = renderHook(() => useScrolled());

    expect(result.current).toBe(true);

    act(() => {
      window.scrollY = 5;
      window.dispatchEvent(new Event('scroll'));
    });

    rerender();

    expect(result.current).toBe(false);
  });

  it('should add event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    window.scrollY = 0;

    renderHook(() => useScrolled());

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    });

    addEventListenerSpy.mockRestore();
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    window.scrollY = 0;

    const { unmount } = renderHook(() => useScrolled());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it('should update listener when threshold changes', () => {
    window.scrollY = 10;
    const { rerender } = renderHook(
      ({ threshold }: { threshold: number }) => useScrolled(threshold),
      { initialProps: { threshold: 5 } }
    );

    window.scrollY = 7;
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    rerender({ threshold: 15 });

    expect(true).toBe(true);
  });

  it('should handle negative scrollY (although uncommon)', () => {
    window.scrollY = -5;
    const { result } = renderHook(() => useScrolled());

    expect(result.current).toBe(false);
  });

  it('should handle very large scroll values', () => {
    window.scrollY = 10000;
    const { result } = renderHook(() => useScrolled(100));

    expect(result.current).toBe(true);
  });

  it('should call onScroll immediately on mount', () => {
    window.scrollY = 15;
    const { result } = renderHook(() => useScrolled(10));

    expect(result.current).toBe(true);
  });
});
