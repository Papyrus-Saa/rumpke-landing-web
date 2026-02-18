import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSubmit, TipFormData } from '@/components/form/hooks/useSubmit';

describe('useSubmit - API Endpoint Tests', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const validFormData: TipFormData = {
    tippgeberName: 'John Doe',
    tippgeberKontakt: 'john@example.com',
    tippgeberAdresse: '123 Main St',
    plzOderStadt: '10115',
    beziehungEigentuemer: 'friend',
    immobilienAdresse: '456 Property St',
    eigentuemerName: 'Jane Smith',
    eigentuemerKontakt: 'jane@example.com',
    praemie: 'Urlaub',
    terms: true,
    captchaToken: 'token123',
  };

  describe('Initial State', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useSubmit());

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBeNull();
      expect(result.current.error).toBeNull();
    });

    it('should provide submit function', () => {
      const { result } = renderHook(() => useSubmit());

      expect(typeof result.current.submit).toBe('function');
    });
  });

  describe('Successful API Call', () => {
    it('should submit data and return success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toEqual({ ok: true, result: { success: true } });
      expect(result.current.success).toContain('Vielen Dank');
      expect(result.current.error).toBeNull();
    });

    it('should send POST request to correct endpoint', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/rumpkeai/tip-form'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('should exclude terms field from request body', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      const callArgs = mockFetch.mock.calls[0];
      const body = JSON.parse(callArgs[1]?.body || '{}');

      expect(body.terms).toBeUndefined();
      expect(body.tippgeberName).toBe('John Doe');
    });

    it('should clear loading state after success', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('Failed API Call - Error Responses', () => {
    it('should handle error response with message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'Invalid form data' } }),
      });

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toBe('Invalid form data');
      expect(result.current.success).toBeNull();
    });

    it('should handle error response without custom message', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: async () => ({}),
      });

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toBe('Bad Request');
    });

    it('should handle generic error fallback', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error',
        json: async () => ({ error: {} }),
      });

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toBe('An unknown error occurred.');
    });

    it('should clear loading state after error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'Error' } }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('Network Errors', () => {
    it('should handle fetch network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toContain('Server fehlgeschlagen');
    });

    it('should handle generic network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network timeout'));

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toBe('Network timeout');
    });

    it('should handle non-Error exceptions', async () => {
      mockFetch.mockRejectedValueOnce('String error');

      const { result } = renderHook(() => useSubmit());

      let submitResult;
      await act(async () => {
        submitResult = await result.current.submit(validFormData);
      });

      expect(submitResult).toBe(false);
      expect(result.current.error).toBe('String error');
    });

    it('should clear loading state after network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.loading).toBe(false);
    });
  });

  describe('State Management', () => {
    it('should clear previous error on new submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'Error 1' } }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.error).toBe('Error 1');

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.error).toBeNull();
      expect(result.current.success).not.toBeNull();
    });

    it('should clear previous success on new submission', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.success).not.toBeNull();

      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'Failed' } }),
      });

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(result.current.success).toBeNull();
      expect(result.current.error).toBe('Failed');
    });

    it('should handle multiple sequential submissions', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, id: 1 }),
      });

      const { result } = renderHook(() => useSubmit());

      let result1: any;
      await act(async () => {
        result1 = await result.current.submit(validFormData);
      });

      expect(result1).toEqual({ ok: true, result: { success: true, id: 1 } });

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, id: 2 }),
      });

      let result2: any;
      await act(async () => {
        result2 = await result.current.submit(validFormData);
      });

      expect(result2).toEqual({ ok: true, result: { success: true, id: 2 } });
    });
  });

  describe('API Endpoint Configuration', () => {
    it('should use custom API URL from environment', async () => {
      const customUrl = 'https://custom-api.com/rumpkeai/tip-form';
      process.env.NEXT_PUBLIC_API_BASE_URL = 'https://custom-api.com';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        customUrl,
        expect.any(Object)
      );

      delete process.env.NEXT_PUBLIC_API_BASE_URL;
    });

    it('should use default API URL when env not set', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());

      await act(async () => {
        await result.current.submit(validFormData);
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('https://api.ichschenkedirwas.de'),
        expect.any(Object)
      );
    });
  });

  describe('Form Data Handling', () => {
    it('should handle optional fields', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());
      const formDataWithoutOptional: TipFormData = {
        ...validFormData,
        eigentuemerName: undefined,
        eigentuemerKontakt: undefined,
      };

      await act(async () => {
        await result.current.submit(formDataWithoutOptional);
      });

      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle all praemie types', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() => useSubmit());
      const praemieTypes: Array<'Urlaub' | 'E-Bike' | 'Gutschein' | 'Küche'> = [
        'Urlaub',
        'E-Bike',
        'Gutschein',
        'Küche',
      ];

      for (const praemie of praemieTypes) {
        const form = { ...validFormData, praemie };

        await act(async () => {
          await result.current.submit(form);
        });

        expect(mockFetch).toHaveBeenCalled();
      }
    });
  });
});
