/**
 * @file wcp-parser.js
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */

/**
 * Parses a WCP string into a JavaScript object.
 *
 * @param {string} wcpString The WCP string to parse (e.g., "action:add; object:cart").
 * @returns {object} A key-value map of the parsed WCP attributes.
 */
function parseWCP(wcpString) {
  const result = {};
  if (!wcpString) {
    return result;
  }

  const pairs = wcpString.split(';');
  for (const pair of pairs) {
    const parts = pair.split(':');
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      result[key] = value;
    }
  }

  return result;
}

/**
 * Finds all elements with the `data-wcp` attribute and parses their values.
 *
 * @param {HTMLElement} rootElement The root element to search within (defaults to `document.body`).
 * @returns {Array<object>} An array of objects, each containing the element and its parsed WCP data.
 */
function findAllWcpElements(rootElement = document.body) {
  const elements = rootElement.querySelectorAll('[data-wcp]');
  const results = [];

  for (const element of elements) {
    const wcpString = element.getAttribute('data-wcp');
    const parsedData = parseWCP(wcpString);
    results.push({
      element,
      data: parsedData,
    });
  }

  return results;
}
