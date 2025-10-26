import { parseWCP } from './wcp-parser';

describe('parseWCP', () => {
  test('should parse a simple WCP string', () => {
    const wcpString = 'action:add; object:cart';
    const expected = { action: 'add', object: 'cart' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should handle extra whitespace', () => {
    const wcpString = ' action: add ;  object: cart  ';
    const expected = { action: 'add', object: 'cart' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should handle a single key-value pair', () => {
    const wcpString = 'action:purchase';
    const expected = { action: 'purchase' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should return an empty object for an empty string', () => {
    const wcpString = '';
    const expected = {};
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should return an empty object for a null string', () => {
    expect(parseWCP(null)).toEqual({});
  });

  test('should ignore pairs without a colon', () => {
    const wcpString = 'action:add; malformed; object:cart';
    const expected = { action: 'add', object: 'cart' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should parse purpose attribute', () => {
    const wcpString = 'purpose:email';
    const expected = { purpose: 'email' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should parse value and currency attributes', () => {
    const wcpString = 'value:price; currency:USD';
    const expected = { value: 'price', currency: 'USD' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should parse toggle and state attributes', () => {
    const wcpString = 'action:toggle; state:on';
    const expected = { action: 'toggle', state: 'on' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });

  test('should parse group-id attribute', () => {
    const wcpString = 'group-id:product-123';
    const expected = { 'group-id': 'product-123' };
    expect(parseWCP(wcpString)).toEqual(expected);
  });
});
