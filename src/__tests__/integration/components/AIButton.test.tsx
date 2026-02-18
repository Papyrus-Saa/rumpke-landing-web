import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AIButton from '@/components/ai-assistant/AIButton';

vi.mock('@/components/ai-assistant/BetaBadge', () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="beta-badge" className={className}>
      Beta Badge
    </div>
  ),
}));

describe('AIButton', () => {
  const mockToggleChat = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render button with type button', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button') as HTMLButtonElement;

      expect(button).toBeInTheDocument();
      expect(button.type).toBe('button');
    });

    it('should have correct title', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.title).toBe('KI-Assistent öffnen/schließen');
    });

    it('should render main container', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const mainDiv = container.querySelector('div');

      expect(mainDiv).toBeInTheDocument();
      expect(mainDiv).toHaveClass('z-600', 'flex', 'flex-col', 'items-center');
    });

    it('should render secondary container', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const divs = container.querySelectorAll('div');

      expect(divs.length).toBeGreaterThan(0);
    });
  });

  describe('visible state', () => {
    it('should apply position classes when visible is false', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const mainDiv = container.firstChild as HTMLElement;

      expect(mainDiv.className).toContain('fixed');
      expect(mainDiv.className).toContain('bottom-10');
      expect(mainDiv.className).toContain('right-2');
    });

    it('should not apply position classes when visible is true', () => {
      const { container } = render(<AIButton visible={true} toggleChat={mockToggleChat} />);
      const mainDiv = container.firstChild as HTMLElement;

      expect(mainDiv.className).not.toContain('fixed');
      expect(mainDiv.className).not.toContain('bottom-10');
    });

    it('should have correct button classes when visible is false', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.className).toContain('text-white');
      expect(button.className).toContain('bg-mint-600');
      expect(button.className).toContain('hover:bg-mint-800');
    });

    it('should have correct button classes when visible is true', () => {
      render(<AIButton visible={true} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.className).toContain('from-cyan-900');
      expect(button.className).toContain('via-mint-600');
      expect(button.className).toContain('to-purple-900');
      expect(button.className).toContain('border-mint-600');
    });

    it('should apply inline styles when visible is true', () => {
      render(<AIButton visible={true} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.style.position).toBe('relative');
      expect(button.style.overflow).toBe('hidden');
    });

    it('should not apply inline styles when visible is false', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.style.position).toBe('');
      expect(button.style.overflow).toBe('');
    });
  });

  describe('icons', () => {
    it('should render robot icon when visible is false', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const loaderLetter = container.querySelector('.loader-letter');
      const xSvg = container.querySelector('.ai-x-svg');

      expect(loaderLetter).toBeInTheDocument();
      expect(xSvg).not.toBeInTheDocument();
    });

    it('should render SVG X when visible is true', () => {
      const { container } = render(<AIButton visible={true} toggleChat={mockToggleChat} />);
      const xSvg = container.querySelector('.ai-x-svg');

      expect(xSvg).toBeInTheDocument();
    });

    it('should have loader-wrapper on render', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const wrapper = container.querySelector('.loader-wrapper');

      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('BetaBadge', () => {
    it('should render BetaBadge by default (showBadge=true)', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const badge = screen.getByTestId('beta-badge');

      expect(badge).toBeInTheDocument();
    });

    it('should render BetaBadge when showBadge is true', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} showBadge={true} />);
      const badge = screen.getByTestId('beta-badge');

      expect(badge).toBeInTheDocument();
    });

    it('should not render BetaBadge when showBadge is false', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} showBadge={false} />);
      const badge = screen.queryByTestId('beta-badge');

      expect(badge).not.toBeInTheDocument();
    });

    it('should pass correct className to BetaBadge', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const badge = screen.getByTestId('beta-badge');

      expect(badge.className).toContain('mb-1');
    });
  });

  describe('interactions', () => {
    it('should call toggleChat when clicking button', async () => {
      const user = userEvent.setup();
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      await user.click(button);

      expect(mockToggleChat).toHaveBeenCalledTimes(1);
    });

    it('should call toggleChat multiple times with multiple clicks', async () => {
      const user = userEvent.setup();
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockToggleChat).toHaveBeenCalledTimes(3);
    });
  });

  describe('CSS classes', () => {
    it('should have all common classes on button', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.className).toContain('w-6');
      expect(button.className).toContain('h-6');
      expect(button.className).toContain('flex');
      expect(button.className).toContain('items-center');
      expect(button.className).toContain('justify-center');
      expect(button.className).toContain('rounded-full');
      expect(button.className).toContain('cursor-pointer');
      expect(button.className).toContain('transition-shadow');
      expect(button.className).toContain('duration-100');
      expect(button.className).toContain('focus:outline-none');
    });

    it('should have z-600 classes on container', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const mainDiv = container.firstChild as HTMLElement;

      expect(mainDiv.className).toContain('z-600');
    });

    it('should have z-600 classes on button', () => {
      render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const button = screen.getByRole('button');

      expect(button.className).toContain('z-600');
    });
  });

  describe('conditional rendering', () => {
    it('should render SVG X when visible is true', () => {
      const { container } = render(<AIButton visible={true} toggleChat={mockToggleChat} />);
      const xSvg = container.querySelector('.ai-x-svg');

      expect(xSvg).toBeInTheDocument();
    });

    it('should not render SVG X when visible is false', () => {
      const { container } = render(<AIButton visible={false} toggleChat={mockToggleChat} />);
      const xSvg = container.querySelector('.ai-x-svg');

      expect(xSvg).not.toBeInTheDocument();
    });

    it('should change from SVG to robot icon when visible changes', () => {
      const { rerender, container } = render(
        <AIButton visible={true} toggleChat={mockToggleChat} />
      );

      let xSvg = container.querySelector('.ai-x-svg');
      expect(xSvg).toBeInTheDocument();

      rerender(<AIButton visible={false} toggleChat={mockToggleChat} />);

      xSvg = container.querySelector('.ai-x-svg');
      expect(xSvg).not.toBeInTheDocument();
    });

    it('should change from robot icon to SVG when visible changes', () => {
      const { rerender, container } = render(
        <AIButton visible={false} toggleChat={mockToggleChat} />
      );

      let xSvg = container.querySelector('.ai-x-svg');
      expect(xSvg).not.toBeInTheDocument();

      rerender(<AIButton visible={true} toggleChat={mockToggleChat} />);

      xSvg = container.querySelector('.ai-x-svg');
      expect(xSvg).toBeInTheDocument();
    });
  });
});
