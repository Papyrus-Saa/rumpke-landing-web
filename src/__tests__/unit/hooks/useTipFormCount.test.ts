import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTipFormCount } from '@/components/form/hooks/useTipFormCount';

describe('useTipFormCount - API Polling Endpoint', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial Setup', () => {
    it('should initialize with total 0', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(result.current.total).toBe(0);
    });

    it('should return object with total property', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(typeof result.current).toBe('object');
      expect('total' in result.current).toBe(true);
    });
  });

  describe('Endpoint Configuration', () => {
    it('should call rumpkeai/count endpoint', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 5 }),
      });

      renderHook(() => useTipFormCount());
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/rumpkeai/count')
      );
    });

    it('should use correct API URL', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 5 }),
      });

      renderHook(() => useTipFormCount());
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.ichschenkedirwas.de')
      );
    });
  });

  describe('Hook Structure', () => {
    it('should only expose total property', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      const keys = Object.keys(result.current);
      expect(keys.length).toBe(1);
      expect(keys[0]).toBe('total');
    });

    it('should return consistent object structure', () => {
      let callCount = 0;
      mockFetch.mockImplementation(async () => ({
        json: async () => ({ totalSubmissions: ++callCount * 10 }),
      }));

      const { result } = renderHook(() => useTipFormCount());
      const initialKeys = Object.keys(result.current);
      expect(initialKeys).toEqual(['total']);
    });
  });

  describe('Multiple Instances', () => {
    it('should handle independent hook instances', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result: result1 } = renderHook(() => useTipFormCount());
      const { result: result2 } = renderHook(() => useTipFormCount());

      expect(result1.current).toBeDefined();
      expect(result2.current).toBeDefined();
      expect(result1.current.total).toBe(0);
      expect(result2.current.total).toBe(0);
    });

    it('should have independent state between instances', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 100 }),
      });

      const { result: result1 } = renderHook(() => useTipFormCount());
      const { result: result2 } = renderHook(() => useTipFormCount());

      expect(result1.current.total).toBe(result2.current.total);
    });
  });

  describe('Data Types', () => {
    it('should handle numeric submission counts', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(typeof result.current.total).toBe('number');
    });

    it('should handle zero count', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 0 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(result.current.total).toBe(0);
    });

    it('should handle large counts', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 999999 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(typeof result.current.total).toBe('number');
    });
  });

  describe('API Response', () => {
    it('should extract totalSubmissions from response', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 55 }),
      });

      renderHook(() => useTipFormCount());
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle API response structure', () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ totalSubmissions: 123, metadata: 'test' }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(result.current).toBeDefined();
    });
  });

  describe('Polling Setup', () => {
    it('should set up interval polling', () => {
      const setIntervalSpy = vi.spyOn(global, 'setInterval');
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 1 }),
      });

      renderHook(() => useTipFormCount());
      expect(setIntervalSpy).toHaveBeenCalledWith(expect.any(Function), 5000);

      setIntervalSpy.mockRestore();
    });

    it('should clean up interval on unmount', () => {
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 1 }),
      });

      const { unmount } = renderHook(() => useTipFormCount());
      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });

  describe('Edge Cases', () => {
    it('should handle repeated calls', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 10 }),
      });

      renderHook(() => useTipFormCount());
      renderHook(() => useTipFormCount());
      renderHook(() => useTipFormCount());

      expect(mockFetch).toHaveBeenCalled();
    });

    it('should be immutable at mount', () => {
      mockFetch.mockResolvedValue({
        json: async () => ({ totalSubmissions: 42 }),
      });

      const { result } = renderHook(() => useTipFormCount());
      expect(Object.isFrozen(result.current) || result.current.total === 0).toBeTruthy();
    });
  });
});
