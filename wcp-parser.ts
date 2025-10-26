/**
 * @file wcp-parser.ts
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */

export interface WcpData {
  [key: string]: string;
}

export interface WcpElement {
  element: HTMLElement;
  data: WcpData;
}

/**
 * Parses a WCP string into a JavaScript object.
 *
 * @param wcpString The WCP string to parse (e.g., "action:add; object:cart").
 * @returns A key-value map of the parsed WCP attributes.
 */
export function parseWCP(wcpString: string | null): WcpData {
  const result: WcpData = {};
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
 * @param rootElement The root element to search within (defaults to `document.body`).
 * @returns An array of objects, each containing the element and its parsed WCP data.
 */
export function findAllWcpElements(rootElement: HTMLElement = document.body): WcpElement[] {
  const elements = rootElement.querySelectorAll<HTMLElement>('[data-wcp]');
  const results: WcpElement[] = [];

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
