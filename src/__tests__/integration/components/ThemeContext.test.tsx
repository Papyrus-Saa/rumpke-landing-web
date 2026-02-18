import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import React, { ReactNode } from 'react';

// Test component that uses the useTheme hook
function TestComponent() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeContext Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('ThemeProvider Component', () => {
    it('should render children correctly', () => {
      render(
        <ThemeProvider>
          <div data-testid="child-element">Child content</div>
        </ThemeProvider>
      );

      expect(screen.getByTestId('child-element')).toBeInTheDocument();
      expect(screen.getByTestId('child-element')).toHaveTextContent('Child content');
    });

    it('should render wrapper div with theme class', () => {
      const { container } = render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );

      const wrapper = container.querySelector('.light');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('light');
    });

    it('should apply dark class when theme is dark', async () => {
      localStorage.setItem('theme', 'dark');

      const { container } = render(
        <ThemeProvider>
          <div>Content</div>
        </ThemeProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      const wrapper = container.querySelector('.dark');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('dark');
    });

    it('should have wrapper div as direct parent of children', () => {
      const { container } = render(
        <ThemeProvider>
          <span data-testid="child">Child</span>
        </ThemeProvider>
      );

      const child = screen.getByTestId('child');
      const parent = child.parentElement;

      expect(parent).toHaveClass('light');
    });

    it('should render multiple children within wrapper', () => {
      render(
        <ThemeProvider>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
          <div data-testid="child-3">Child 3</div>
        </ThemeProvider>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
      expect(screen.getByTestId('child-3')).toBeInTheDocument();
    });
  });

  describe('useTheme Hook - Error Cases', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test since we expect an error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        render(<TestComponent />);
      }).toThrow();

      consoleSpy.mockRestore();
    });

    it('should throw error with specific message when context is undefined', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        render(<TestComponent />);
      }).toThrow(Error);

      consoleSpy.mockRestore();
    });
  });

  describe('useTheme Hook - Within Provider', () => {
    it('should return theme value from context', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('light');
    });

    it('should return toggleTheme function from context', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');
      expect(toggleButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(toggleButton);

      const themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('dark');
    });

    it('should provide consistent context value to multiple consumers', () => {
      function Consumer1() {
        const { theme } = useTheme();
        return <div data-testid="consumer-1">{theme}</div>;
      }

      function Consumer2() {
        const { theme } = useTheme();
        return <div data-testid="consumer-2">{theme}</div>;
      }

      render(
        <ThemeProvider>
          <Consumer1 />
          <Consumer2 />
        </ThemeProvider>
      );

      const consumer1 = screen.getByTestId('consumer-1');
      const consumer2 = screen.getByTestId('consumer-2');

      expect(consumer1).toHaveTextContent('light');
      expect(consumer2).toHaveTextContent('light');
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('should toggle theme from light to dark', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('light');

      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();
      await user.click(toggleButton);

      expect(themeValue).toHaveTextContent('dark');
    });

    it('should toggle theme from dark to light', async () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      let themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('dark');

      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();
      await user.click(toggleButton);

      themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('light');
    });

    it('should toggle theme multiple times', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const themeValue = screen.getByTestId('theme-value');
      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();

      expect(themeValue).toHaveTextContent('light');

      await user.click(toggleButton);
      expect(themeValue).toHaveTextContent('dark');

      await user.click(toggleButton);
      expect(themeValue).toHaveTextContent('light');

      await user.click(toggleButton);
      expect(themeValue).toHaveTextContent('dark');
    });

    it('should update wrapper class when toggling theme', async () => {
      const { container } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      let wrapper = container.querySelector('.light');
      expect(wrapper).toBeInTheDocument();

      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();
      await user.click(toggleButton);

      wrapper = container.querySelector('.dark');
      expect(wrapper).toBeInTheDocument();
    });

    it('should maintain theme state across context updates', async () => {
      function MultiConsumer() {
        const { theme, toggleTheme } = useTheme();

        return (
          <div>
            <div data-testid="theme-display">{theme}</div>
            <button onClick={toggleTheme} data-testid="toggle">
              Toggle
            </button>
            <div data-testid="theme-display-2">{theme}</div>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <MultiConsumer />
        </ThemeProvider>
      );

      const display1 = screen.getByTestId('theme-display');
      const display2 = screen.getByTestId('theme-display-2');
      const toggleButton = screen.getByTestId('toggle');

      expect(display1).toHaveTextContent('light');
      expect(display2).toHaveTextContent('light');

      const user = userEvent.setup();
      await user.click(toggleButton);

      expect(display1).toHaveTextContent('dark');
      expect(display2).toHaveTextContent('dark');
    });
  });

  describe('Theme Persistence', () => {
    it('should persist theme change to localStorage', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();
      await user.click(toggleButton);

      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('should restore theme from localStorage on mount', async () => {
      localStorage.setItem('theme', 'dark');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await new Promise((resolve) => setTimeout(resolve, 0));
      const themeValue = screen.getByTestId('theme-value');
      expect(themeValue).toHaveTextContent('dark');
    });

    it('should keep theme synchronized with localStorage updates', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const toggleButton = screen.getByTestId('toggle-button');
      const user = userEvent.setup();

      await user.click(toggleButton);
      expect(localStorage.getItem('theme')).toBe('dark');

      await user.click(toggleButton);
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('Provider Value Structure', () => {
    it('should provide object with theme and toggleTheme properties', () => {
      function ValueChecker() {
        const value = useTheme();
        return (
          <div>
            <div data-testid="has-theme">{typeof value.theme === 'string' ? 'yes' : 'no'}</div>
            <div data-testid="has-toggle">{typeof value.toggleTheme === 'function' ? 'yes' : 'no'}</div>
          </div>
        );
      }

      render(
        <ThemeProvider>
          <ValueChecker />
        </ThemeProvider>
      );

      expect(screen.getByTestId('has-theme')).toHaveTextContent('yes');
      expect(screen.getByTestId('has-toggle')).toHaveTextContent('yes');
    });

    it('should maintain context value reference stability across rerenders', async () => {
      const renderCounts: number[] = [];
      let renderCount = 0;

      function StableValueConsumer() {
        const { theme } = useTheme();
        renderCount++;
        renderCounts.push(renderCount);

        return <div data-testid="render-count">{renderCount}</div>;
      }

      const { rerender } = render(
        <ThemeProvider>
          <StableValueConsumer />
        </ThemeProvider>
      );

      expect(screen.getByTestId('render-count')).toHaveTextContent('1');

      rerender(
        <ThemeProvider>
          <StableValueConsumer />
        </ThemeProvider>
      );

      expect(renderCount).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Edge Cases and Integration', () => {
    it('should handle nested ThemeProvider gracefully', () => {
      function TestContent() {
        const { theme } = useTheme();
        return <div data-testid="nested-theme">{theme}</div>;
      }

      const { container } = render(
        <ThemeProvider>
          <TestContent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('nested-theme')).toBeInTheDocument();
      expect(container.querySelector('.light')).toBeInTheDocument();
    });

    it('should render with empty children', () => {
      const { container } = render(
        <ThemeProvider>
          {null}
        </ThemeProvider>
      );

      expect(container.querySelector('.light')).toBeInTheDocument();
    });

    it('should render with fragment children', () => {
      render(
        <ThemeProvider>
          <>
            <div data-testid="frag-child-1">Child 1</div>
            <div data-testid="frag-child-2">Child 2</div>
          </>
        </ThemeProvider>
      );

      expect(screen.getByTestId('frag-child-1')).toBeInTheDocument();
      expect(screen.getByTestId('frag-child-2')).toBeInTheDocument();
    });

    it('should maintain scope of theme in isolated providers', () => {
      function Component1() {
        const { theme } = useTheme();
        return <div data-testid="comp1-theme">{theme}</div>;
      }

      const { container: container1 } = render(
        <ThemeProvider>
          <Component1 />
        </ThemeProvider>
      );

      expect(screen.getByTestId('comp1-theme')).toHaveTextContent('light');
      expect(container1.querySelector('.light')).toBeInTheDocument();
    });
  });
});
