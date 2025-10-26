import { validateAllWcpElements } from './wcp-validator';

describe('validateAllWcpElements', () => {
  beforeEach(() => {
    // Set up a mock DOM for each test
    document.body.innerHTML = '';
  });

  test('should return no errors for valid WCP attributes', () => {
    document.body.innerHTML = `
      <button data-wcp="action:add; object:cart"></button>
      <button data-wcp="action:toggle; state:on"></button>
    `;
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(0);
  });

  test('should detect an invalid action', () => {
    document.body.innerHTML = '<button data-wcp="action:fly"></button>';
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(1);
    expect(errors[0].errors[0]).toContain('Invalid action: "fly"');
  });

  test('should detect an invalid effect', () => {
    document.body.innerHTML = '<button data-wcp="effect:explode"></button>';
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(1);
    expect(errors[0].errors[0]).toContain('Invalid effect: "explode"');
  });

  test('should detect a missing state for a toggle action', () => {
    document.body.innerHTML = '<button data-wcp="action:toggle"></button>';
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(1);
    expect(errors[0].errors[0]).toContain('must also have a "state" attribute');
  });

  test('should handle multiple errors on one element', () => {
    document.body.innerHTML = '<button data-wcp="action:jump; effect:disappear"></button>';
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(1);
    expect(errors[0].errors.length).toBe(2);
  });

  test('should correctly identify multiple invalid elements', () => {
    document.body.innerHTML = `
      <button data-wcp="action:wrong"></button>
      <a data-wcp="action:toggle"></a>
    `;
    const errors = validateAllWcpElements();
    expect(errors.length).toBe(2);
  });
});
