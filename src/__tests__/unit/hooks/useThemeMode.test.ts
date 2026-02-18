import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useThemeMode } from '@/hooks/useThemeMode';

describe('useThemeMode', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should start with light theme by default', () => {
    const { result } = renderHook(() => useThemeMode());
    expect(result.current.theme).toBe('light');
  });

  it('should load theme from localStorage if exists', async () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useThemeMode());

    await waitFor(() => {
      expect(result.current.theme).toBe('dark');
    });
  });

  it('should use system preference if no localStorage', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any);

    const { result } = renderHook(() => useThemeMode());

    await waitFor(() => {
      expect(result.current.theme).toBe('dark');
    });
  });

  it('should save theme to localStorage when changed', async () => {
    const { result } = renderHook(() => useThemeMode());

    expect(localStorage.getItem('theme')).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('dark');
    });
  });

  it('should toggle between light and dark correctly', async () => {
    const { result } = renderHook(() => useThemeMode());

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(result.current.theme).toBe('dark');
    });

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(result.current.theme).toBe('light');
    });
  });

  it('should maintain persistence after multiple toggles', async () => {
    const { result } = renderHook(() => useThemeMode());

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(result.current.theme).toBe('dark');
    });

    act(() => {
      result.current.toggleTheme();
    });

    await waitFor(() => {
      expect(result.current.theme).toBe('light');
    });

    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should prefer localStorage over system preference', async () => {
    vi.mocked(window.matchMedia).mockReturnValue({
      matches: true,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    } as any);

    localStorage.setItem('theme', 'light');

    const { result } = renderHook(() => useThemeMode());

    await waitFor(() => {
      expect(result.current.theme).toBe('light');
    });
  });
});
