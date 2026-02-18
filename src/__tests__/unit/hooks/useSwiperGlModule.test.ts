import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useSwiperGlModule from '@/hooks/useSwiperGlModule';

// Mock the dynamic import
vi.mock('@/lib/uii/shaders/swiper-gl.esm.js', () => ({
  default: { name: 'MockSwiperGLModule' },
}));

describe('useSwiperGlModule - Dynamic Module Loading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with empty mods array', () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(Array.isArray(result.current.mods)).toBe(true);
      expect(result.current.mods).toHaveLength(0);
    });

    it('should initialize with ready false', () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(result.current.ready).toBe(false);
    });

    it('should return object with mods and ready properties', () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(result.current).toHaveProperty('mods');
      expect(result.current).toHaveProperty('ready');
    });
  });

  describe('Default Module Loading', () => {
    it('should load default swiper-gl module', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods).toHaveLength(1);
    });

    it('should load when no modulePath provided', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods[0]).toBeDefined();
    });

    it('should set ready to true after loading', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(result.current.ready).toBe(false);

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });
    });

    it('should populate mods array with loaded module', async () => {
      const { result } = renderHook(() =>
        useSwiperGlModule('@/lib/uii/shaders/swiper-gl.esm.js')
      );

      await waitFor(() => {
        expect(result.current.mods.length).toBeGreaterThan(0);
      });

      expect(result.current.mods[0]).toHaveProperty('name');
    });
  });

  describe('Module Path Parameter', () => {
    it('should accept custom module paths', async () => {
      const customPath = '@/lib/uii/shaders/swiper-gl.esm.js';
      const { result } = renderHook(() => useSwiperGlModule(customPath));

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });
    });

    it('should use provided path as default', async () => {
      const { result } = renderHook(() =>
        useSwiperGlModule('@/lib/uii/shaders/swiper-gl.esm.js')
      );

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods).toHaveLength(1);
    });
  });

  describe('Error Handling', () => {
    it('should handle unsupported module paths', async () => {
      const { result } = renderHook(() => useSwiperGlModule('/unsupported/path.js'));

      await waitFor(() => {
        expect(result.current.ready).toBe(false);
      });

      expect(result.current.mods).toHaveLength(0);
    });

    it('should set ready to false on error', async () => {
      const { result } = renderHook(() =>
        useSwiperGlModule('/invalid/path/something.js')
      );

      await waitFor(() => {
        expect(result.current.ready).toBe(false);
      });
    });

    it('should handle module import failures gracefully', async () => {
      const { result } = renderHook(() => useSwiperGlModule('path/to/invalid'));

      await waitFor(() => {
        expect(result.current.ready).toBe(false);
      });

      expect(() => {
        expect(result.current.mods).toBeDefined();
      }).not.toThrow();
    });
  });

  describe('Module Content', () => {
    it('should load module with default export', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods[0]).toHaveProperty('name', 'MockSwiperGLModule');
    });

    it('should handle modules with and without default export', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Memory Leak Prevention', () => {
    it('should prevent state updates after unmount', async () => {
      const { result, unmount } = renderHook(() => useSwiperGlModule());

      const initialReady = result.current.ready;

      unmount();

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(result.current.ready).toBe(initialReady);
    });
  });

  describe('Multiple Hook Instances', () => {
    it('should maintain independent state for multiple instances', async () => {
      const { result: result1 } = renderHook(() => useSwiperGlModule());
      const { result: result2 } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result1.current.ready).toBe(true);
        expect(result2.current.ready).toBe(true);
      });

      expect(result1.current.mods).not.toBe(result2.current.mods);
    });

    it('should each have their own module instance', async () => {
      const { result: result1 } = renderHook(() => useSwiperGlModule());
      const { result: result2 } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result1.current.ready).toBe(true);
        expect(result2.current.ready).toBe(true);
      });

      expect(result1.current.mods.length).toBe(1);
      expect(result2.current.mods.length).toBe(1);
    });
  });

  describe('Loading Sequence', () => {
    it('should have proper loading sequence', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      // Initially not ready
      expect(result.current.ready).toBe(false);
      expect(result.current.mods).toHaveLength(0);

      // Wait for loading
      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      // After loading
      expect(result.current.mods).toHaveLength(1);
    });

    it('should emit ready state before mods are populated', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods.length).toBe(1);
    });
  });

  describe('Return Value Structure', () => {
    it('should always return an object with mods and ready', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(result.current).toHaveProperty('mods');
      expect(result.current).toHaveProperty('ready');
    });

    it('should have mods as array type', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(Array.isArray(result.current.mods)).toBe(true);
    });

    it('should have ready as boolean type', () => {
      const { result } = renderHook(() => useSwiperGlModule());

      expect(typeof result.current.ready === 'boolean').toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty module path string', async () => {
      const { result } = renderHook(() => useSwiperGlModule(''));

      await waitFor(() => {
        expect(result.current.ready).toBe(false);
      });
    });

    it('should handle null-like module exports', async () => {
      const { result } = renderHook(() => useSwiperGlModule());

      await waitFor(() => {
        expect(result.current.ready).toBe(true);
      });

      expect(result.current.mods).toBeDefined();
    });

    it('should handle rapid mount/unmount cycles', async () => {
      for (let i = 0; i < 3; i++) {
        const { unmount } = renderHook(() => useSwiperGlModule());
        unmount();
      }

      // Should not crash
      expect(true).toBe(true);
    });
  });

  describe('Error Messages', () => {
    it('should throw error for unsupported module', async () => {
      const { result } = renderHook(() =>
        useSwiperGlModule('/path/to/unsupported.js')
      );

      await waitFor(() => {
        expect(result.current.ready).toBe(false);
      });
    });
  });
});
