import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTrustUsModal } from '@/components/trustUs/useTrustUsModal';

describe('useTrustUsModal - Modal State Management', () => {
  describe('Initial State', () => {
    it('should initialize with no selected badge', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(result.current.selectedBadge).toBeNull();
    });

    it('should initialize with closed trust modal', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(result.current.showTrustModal).toBe(false);
    });

    it('should provide badges array', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(Array.isArray(result.current.badges)).toBe(true);
    });

    it('should provide all modal control functions', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(typeof result.current.openBadgeModal).toBe('function');
      expect(typeof result.current.closeBadgeModal).toBe('function');
      expect(typeof result.current.openTrustModal).toBe('function');
      expect(typeof result.current.closeTrustModal).toBe('function');
    });
  });

  describe('Badges Array', () => {
    it('should have exactly 3 badges', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(result.current.badges).toHaveLength(3);
    });

    it('should have badge with id 1', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge1 = result.current.badges[0];

      expect(badge1.id).toBe(1);
    });

    it('should have badge with id 2', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge2 = result.current.badges[1];

      expect(badge2.id).toBe(2);
    });

    it('should have badge with id 3', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge3 = result.current.badges[2];

      expect(badge3.id).toBe(3);
    });

    it('should have name property on each badge', () => {
      const { result } = renderHook(() => useTrustUsModal());

      result.current.badges.forEach((badge) => {
        expect(typeof badge.name).toBe('string');
        expect(badge.name.length).toBeGreaterThan(0);
      });
    });

    it('should have description on each badge', () => {
      const { result } = renderHook(() => useTrustUsModal());

      result.current.badges.forEach((badge) => {
        expect(typeof badge.description).toBe('string');
        expect(badge.description.length).toBeGreaterThan(0);
      });
    });

    it('should have icon on each badge', () => {
      const { result } = renderHook(() => useTrustUsModal());

      result.current.badges.forEach((badge) => {
        expect(badge.icon).toBeDefined();
      });
    });
  });

  describe('Badge Modal Control', () => {
    it('should open badge modal with selected badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      act(() => {
        result.current.openBadgeModal(badge);
      });

      expect(result.current.selectedBadge).toEqual(badge);
    });

    it('should set selectedBadge to the clicked badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge2 = result.current.badges[1];

      act(() => {
        result.current.openBadgeModal(badge2);
      });

      expect(result.current.selectedBadge?.id).toBe(2);
      expect(result.current.selectedBadge?.name).toBe('Zertifikat Wertermittlung');
    });

    it('should close badge modal', () => {
      const { result } = renderHook(() => useTrustUsModal());

      act(() => {
        result.current.openBadgeModal(result.current.badges[0]);
      });

      expect(result.current.selectedBadge).not.toBeNull();

      act(() => {
        result.current.closeBadgeModal();
      });

      expect(result.current.selectedBadge).toBeNull();
    });

    it('should allow switching between badges', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge1 = result.current.badges[0];
      const badge2 = result.current.badges[1];

      act(() => {
        result.current.openBadgeModal(badge1);
      });

      expect(result.current.selectedBadge?.id).toBe(1);

      act(() => {
        result.current.openBadgeModal(badge2);
      });

      expect(result.current.selectedBadge?.id).toBe(2);
    });

    it('should allow reopening same badge after closing', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      act(() => {
        result.current.openBadgeModal(badge);
      });

      expect(result.current.selectedBadge).not.toBeNull();

      act(() => {
        result.current.closeBadgeModal();
      });

      expect(result.current.selectedBadge).toBeNull();

      act(() => {
        result.current.openBadgeModal(badge);
      });

      expect(result.current.selectedBadge?.id).toBe(1);
    });
  });

  describe('Trust Modal Control', () => {
    it('should open trust modal', () => {
      const { result } = renderHook(() => useTrustUsModal());

      act(() => {
        result.current.openTrustModal();
      });

      expect(result.current.showTrustModal).toBe(true);
    });

    it('should close trust modal', () => {
      const { result } = renderHook(() => useTrustUsModal());

      act(() => {
        result.current.openTrustModal();
      });

      expect(result.current.showTrustModal).toBe(true);

      act(() => {
        result.current.closeTrustModal();
      });

      expect(result.current.showTrustModal).toBe(false);
    });

    it('should toggle trust modal state', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(result.current.showTrustModal).toBe(false);

      act(() => {
        result.current.openTrustModal();
      });

      expect(result.current.showTrustModal).toBe(true);

      act(() => {
        result.current.closeTrustModal();
      });

      expect(result.current.showTrustModal).toBe(false);
    });
  });

  describe('Independent Modal States', () => {
    it('should manage badge and trust modals independently', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      act(() => {
        result.current.openBadgeModal(badge);
      });

      expect(result.current.selectedBadge).not.toBeNull();
      expect(result.current.showTrustModal).toBe(false);

      act(() => {
        result.current.openTrustModal();
      });

      expect(result.current.selectedBadge).not.toBeNull();
      expect(result.current.showTrustModal).toBe(true);
    });

    it('should allow both modals open simultaneously', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[1];

      act(() => {
        result.current.openBadgeModal(badge);
        result.current.openTrustModal();
      });

      expect(result.current.selectedBadge).not.toBeNull();
      expect(result.current.showTrustModal).toBe(true);
    });

    it('should allow closing badge modal without affecting trust modal', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      act(() => {
        result.current.openBadgeModal(badge);
        result.current.openTrustModal();
      });

      act(() => {
        result.current.closeBadgeModal();
      });

      expect(result.current.selectedBadge).toBeNull();
      expect(result.current.showTrustModal).toBe(true);
    });

    it('should allow closing trust modal without affecting badge modal', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      act(() => {
        result.current.openBadgeModal(badge);
        result.current.openTrustModal();
      });

      act(() => {
        result.current.closeTrustModal();
      });

      expect(result.current.selectedBadge).not.toBeNull();
      expect(result.current.showTrustModal).toBe(false);
    });
  });

  describe('First Badge - Immobilienmakler', () => {
    it('should have correct name for first badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      expect(badge.name).toBe('Zertifikat Immobilienmakler');
    });

    it('should have correct description for first badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      expect(badge.description).toContain('IHK-zertifizierte');
    });

    it('should have certificate image for first badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[0];

      expect(badge.certificateImage).toBe('/certificates/real-estate-agent-cert.jpg');
    });
  });

  describe('Second Badge - Wertermittlung', () => {
    it('should have correct name for second badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[1];

      expect(badge.name).toBe('Zertifikat Wertermittlung');
    });

    it('should have correct description for second badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[1];

      expect(badge.description).toContain('Spezialisierte Ausbildung');
    });

    it('should have certificate image for second badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[1];

      expect(badge.certificateImage).toBe('/certificates/property-valuation-cert.jpg');
    });
  });

  describe('Third Badge - Vertrauenswürdigkeit', () => {
    it('should have correct name for third badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      expect(badge.name).toBe('Vertrauenswürdigkeit');
    });

    it('should have correct description for third badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      expect(badge.description).toContain('Zuverlässigkeit');
    });

    it('should have details array for third badge', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      expect(Array.isArray(badge.details)).toBe(true);
      expect(badge.details!.length).toBeGreaterThan(0);
    });

    it('should have correct detail sections', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      expect(badge.details).toHaveLength(3);
      expect(badge.details![0].title).toContain('Rechtliche Rahmenbedingungen');
      expect(badge.details![1].title).toContain('Wirtschaftliche');
      expect(badge.details![2].title).toContain('Finanzierung');
    });

    it('should have items in each detail section', () => {
      const { result } = renderHook(() => useTrustUsModal());
      const badge = result.current.badges[2];

      badge.details!.forEach((section) => {
        expect(Array.isArray(section.items)).toBe(true);
        expect(section.items.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Multiple Hook Instances', () => {
    it('should maintain independent state for multiple instances', () => {
      const { result: result1 } = renderHook(() => useTrustUsModal());
      const { result: result2 } = renderHook(() => useTrustUsModal());

      act(() => {
        result1.current.openBadgeModal(result1.current.badges[0]);
      });

      expect(result1.current.selectedBadge?.id).toBe(1);
      expect(result2.current.selectedBadge).toBeNull();

      act(() => {
        result2.current.openTrustModal();
      });

      expect(result1.current.showTrustModal).toBe(false);
      expect(result2.current.showTrustModal).toBe(true);
    });
  });

  describe('Button Click Scenarios', () => {
    it('should handle badge click sequence', () => {
      const { result } = renderHook(() => useTrustUsModal());

      const badge1 = result.current.badges[0];
      const badge2 = result.current.badges[1];
      const badge3 = result.current.badges[2];

      act(() => {
        result.current.openBadgeModal(badge1);
      });

      expect(result.current.selectedBadge?.id).toBe(1);

      act(() => {
        result.current.openBadgeModal(badge2);
      });

      expect(result.current.selectedBadge?.id).toBe(2);

      act(() => {
        result.current.openBadgeModal(badge3);
      });

      expect(result.current.selectedBadge?.id).toBe(3);
    });
  });

  describe('Return Value Structure', () => {
    it('should return all expected properties', () => {
      const { result } = renderHook(() => useTrustUsModal());

      expect(result.current).toHaveProperty('badges');
      expect(result.current).toHaveProperty('selectedBadge');
      expect(result.current).toHaveProperty('showTrustModal');
      expect(result.current).toHaveProperty('openBadgeModal');
      expect(result.current).toHaveProperty('closeBadgeModal');
      expect(result.current).toHaveProperty('openTrustModal');
      expect(result.current).toHaveProperty('closeTrustModal');
    });

    it('should have exactly 7 properties', () => {
      const { result } = renderHook(() => useTrustUsModal());

      const keys = Object.keys(result.current);
      expect(keys).toHaveLength(7);
    });
  });
});
