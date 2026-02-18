# Testing Guide - rumpke-landing-web

## Overview

This project uses **Vitest** as the test runner with **React Testing Library** for component testing. All tests follow best practices for maintainability, readability, and comprehensive coverage.

**Current Coverage:**
- 69 tests across hooks, components, and integrations
- 100% code coverage target for all tested modules
- All external libraries tested directly (not mocked)

---

## Quick Start

### Running Tests

```bash
# Watch mode (development)
npm run test

# Visual UI dashboard
npm run test:ui

# Single run (CI/CD)
npm run test:run

# Coverage report
npm run test:coverage
```

### Test Structure

```
src/__tests__/
├── unit/
│   ├── hooks/           # Pure hook logic tests
│   └── lib/             # Utility function tests
├── integration/
│   └── components/      # Component + hook integration tests
└── e2e/                 # End-to-end tests (placeholder)
```

---

## Testing Philosophy

### 1. Test User Behavior, Not Implementation
- Query by user-facing elements (role, label, text)
- Avoid querying by implementation details (className, data-testid where possible)
- Use `screen` for all queries for better accessibility checking

```typescript
// ✅ Good
screen.getByRole('button', { name: /toggle/i })

// ❌ Avoid
container.querySelector('.toggle-btn')
```

### 2. AAA Pattern (Arrange-Act-Assert)
Every test follows this structure:

```typescript
it('should toggle theme when button clicked', async () => {
  // Arrange
  render(<ThemeProvider><TestComponent /></ThemeProvider>);
  const button = screen.getByRole('button');

  // Act
  const user = userEvent.setup();
  await user.click(button);

  // Assert
  expect(screen.getByText('dark')).toBeInTheDocument();
});
```

### 3. 100% Coverage Requirements
All tested modules must meet coverage thresholds:
- **Lines:** 100%
- **Functions:** 100%
- **Branches:** 100%
- **Statements:** 100%

Coverage reports are generated in `coverage/` directory after running `npm run test:coverage`.

### 4. No Mocking External Libraries
External dependencies are tested directly:
- **leaflet** - Tested with real Leaflet instances
- **cesium** - Tested with real CesiumWidget
- **framer-motion** - Tested with real animations
- **react-hook-form** - Tested with real form behavior

Mock only:
- Browser APIs (localStorage, matchMedia) - see `src/setupTests.ts`
- Child components in isolated unit tests when necessary

---

## Test Files Organization

### Hooks Tests (`src/__tests__/unit/hooks/`)

**useThemeMode.test.ts** (7 tests)
- Default light theme initialization
- System preference detection (matchMedia)
- localStorage persistence
- Theme toggle functionality
- Multiple toggle cycles

**useScrolled.test.ts** (13 tests)
- Scroll event listener setup/cleanup
- Custom threshold support
- State updates on threshold cross
- Event listener lifecycle

**useRandomColoredWord.test.tsx** (12 tests)
- pickRandom logic (word and color selection)
- Render output (JSX structure)
- CSS classes and inline styles
- Edge cases (single word, empty text)

### Components Tests (`src/__tests__/integration/components/`)

**AIButton.test.tsx** (26 tests)
- Conditional rendering (visible/hidden)
- Position classes (fixed/absolute positioning)
- Icon rendering (robot icon vs custom SVG)
- BetaBadge integration
- Click interactions
- CSS class application

**ThemeContext.test.tsx** (24 tests)
- Provider renders children
- useTheme hook usage (inside/outside provider)
- Theme context value structure
- Theme toggling and state updates
- localStorage synchronization
- Multiple consumers with consistent state
- Edge cases (nested providers, empty children)

---

## Test Configuration

### vitest.config.ts

```typescript
export default defineConfig({
  test: {
    // Browser-like environment with DOM APIs
    environment: 'jsdom',

    // Global setup for mocks
    setupFiles: ['./src/setupTests.ts'],

    // 100% coverage thresholds
    coverage: {
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

### setupTests.ts

Global setup file providing:
- `@testing-library/jest-dom` matchers
- localStorage mock
- matchMedia mock (for system preference)

---

## Common Test Patterns

### Testing Async State Updates

```typescript
it('should update state after effect', async () => {
  render(<Component />);

  // Allow useEffect to run
  await new Promise((resolve) => setTimeout(resolve, 0));

  expect(screen.getByText('updated')).toBeInTheDocument();
});
```

### Testing User Interactions

```typescript
it('should handle user input', async () => {
  render(<Form />);
  const input = screen.getByRole('textbox');

  const user = userEvent.setup();
  await user.type(input, 'hello');

  expect(input).toHaveValue('hello');
});
```

### Testing Context Providers

```typescript
it('should provide value to consumers', () => {
  function Consumer() {
    const value = useMyContext();
    return <div>{value}</div>;
  }

  render(
    <MyProvider>
      <Consumer />
    </MyProvider>
  );

  expect(screen.getByText('expected-value')).toBeInTheDocument();
});
```

### Testing Error Boundaries

```typescript
it('should throw error outside provider', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    render(<ComponentWithoutProvider />);
  }).toThrow();

  spy.mockRestore();
});
```

---

## Best Practices Checklist

- [ ] Use `screen` for all queries when possible
- [ ] Use `userEvent` instead of `fireEvent` for realistic interactions
- [ ] Follow AAA pattern (Arrange-Act-Assert)
- [ ] Test user-facing behavior, not implementation
- [ ] Use descriptive test names (should ...)
- [ ] Keep tests focused and isolated
- [ ] Mock only what's necessary (browser APIs, not libraries)
- [ ] Aim for 100% coverage on all tested files
- [ ] Use `beforeEach` to reset mocks/state
- [ ] Avoid testing implementation details

---

## CI/CD Integration

### GitHub Actions Workflow

Tests run automatically on:
- Push to main branch
- Pull requests to main branch
- Manual workflow dispatch

Workflow file: `.github/workflows/test.yml`

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:run
      - run: npm run test:coverage
```

### Pre-commit Hook (Optional)

To run tests before committing:

```bash
npm run test:run
```

---

## Debugging Tests

### View Test UI Dashboard

```bash
npm run test:ui
```

Opens web interface at `http://localhost:51204` with:
- Test file browser
- Live test results
- Coverage visualization
- Execution timeline

### Enable Debug Output

```typescript
import { screen, debug } from '@testing-library/react';

it('should debug rendering', () => {
  render(<Component />);
  debug(); // Prints DOM to console
  screen.debug(screen.getByRole('button')); // Debug specific element
});
```

### Watch Mode Development

```bash
npm run test
```

Press:
- `a` - Run all tests
- `f` - Run failed tests only
- `w` - Watch mode (default)
- `q` - Quit

---

## Common Issues

### Issue: Tests timeout with async effects
**Solution:** Add timeout before expecting changes:
```typescript
await new Promise((resolve) => setTimeout(resolve, 0));
```

### Issue: localStorage not persisting across tests
**Solution:** Clear in beforeEach:
```typescript
beforeEach(() => {
  localStorage.clear();
});
```

### Issue: "not wrapped in act(...)" warning
**Solution:** Use `userEvent` instead of `fireEvent`:
```typescript
const user = userEvent.setup();
await user.click(button);
```

### Issue: matchMedia not available
**Solution:** Mock is provided in setupTests.ts - no additional setup needed.

---

## Adding New Tests

### Step 1: Create Test File
```bash
touch src/__tests__/unit/hooks/useNewHook.test.ts
```

### Step 2: Write Tests
```typescript
import { describe, it, expect } from 'vitest';
import { useNewHook } from '@/hooks/useNewHook';

describe('useNewHook', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useNewHook());
    expect(result.current).toBe('default');
  });
});
```

### Step 3: Verify Coverage
```bash
npm run test:coverage -- src/__tests__/unit/hooks/useNewHook.test.ts
```

### Step 4: Commit
```bash
git add src/__tests__/unit/hooks/useNewHook.test.ts
git commit -m "test: add useNewHook tests"
```

---

## Test Naming Convention

Use descriptive names that explain expected behavior:

```typescript
// Format: "should [action] when [condition]" or "should [expected outcome]"

✅ "should toggle theme from light to dark when button clicked"
✅ "should throw error when used outside provider"
✅ "should persist theme to localStorage"
✅ "should render BetaBadge component"

❌ "test toggle"
❌ "should work"
❌ "test 1"
```

---

## Coverage Goals

Current test coverage provides:

| Category | Files | Tests | Lines |
|----------|-------|-------|-------|
| Hooks | 3 | 32 | 100% |
| Components | 1 | 26 | 100% |
| Integration | 1 | 24 | 100% |
| **Total** | **5** | **69** | **100%** |

Future expansion:
- Additional component integration tests
- Form submission flows
- Error boundary tests
- Performance tests (if needed)

---

## Resources

- [Vitest Documentation](https://vitest.dev)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [Jest Matchers](https://vitest.dev/api/expect.html)
- [userEvent Documentation](https://testing-library.com/docs/user-event/intro)

---

## Questions or Issues?

For test-related questions or to add new test modules:
1. Check existing test files for patterns
2. Review Testing Library documentation
3. Run `npm run test:ui` for detailed test execution
4. Check coverage report for untested branches
