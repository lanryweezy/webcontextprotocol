/**
 * @file wcp-validator.ts
 * @license CC0
 * @author Your Name
 * @description A validator for the Web Context Protocol (WCP).
 */

import { parseWCP, WcpData } from './wcp-parser';

const VALID_ACTIONS: Set<string> = new Set(['add', 'purchase', 'search', 'submit', 'delete', 'cancel', 'navigate', 'toggle']);
const VALID_EFFECTS: Set<string> = new Set(['async', 'navigate', 'modal', 'download']);

export interface WcpValidationError {
  element: HTMLElement;
  errors: string[];
}

/**
 * Validates a single WCP object.
 *
 * @param wcpData The parsed WCP object.
 * @returns A list of validation errors.
 */
function validateWCP(wcpData: WcpData): string[] {
  const errors: string[] = [];

  if (wcpData.action && !VALID_ACTIONS.has(wcpData.action)) {
    errors.push(`Invalid action: "${wcpData.action}". Must be one of: ${[...VALID_ACTIONS].join(', ')}`);
  }

  if (wcpData.effect && !VALID_EFFECTS.has(wcpData.effect)) {
    errors.push(`Invalid effect: "${wcpData.effect}". Must be one of: ${[...VALID_EFFECTS].join(', ')}`);
  }

  if (wcpData.action === 'toggle' && !wcpData.state) {
    errors.push('An element with "action:toggle" must also have a "state" attribute.');
  }

  return errors;
}

/**
 * Finds all WCP elements on a page and validates them.
 *
 * @param rootElement The root element to search within (defaults to `document.body`).
 * @returns An array of objects, each containing the element and any validation errors.
 */
export function validateAllWcpElements(rootElement: HTMLElement = document.body): WcpValidationError[] {
  const elements = rootElement.querySelectorAll<HTMLElement>('[data-wcp]');
  const results: WcpValidationError[] = [];

  for (const element of elements) {
    const wcpString = element.getAttribute('data-wcp');
    const parsedData = parseWCP(wcpString);
    const errors = validateWCP(parsedData);

    if (errors.length > 0) {
      results.push({
        element,
        errors,
      });
    }
  }

  return results;
}
