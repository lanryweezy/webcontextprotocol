/**
 * @file wcp-validator.ts
 * @license CC0
 * @author Your Name
 * @description A validator for the Web Context Protocol (WCP).
 */
interface WcpValidationError {
    element: HTMLElement;
    errors: string[];
}
/**
 * Finds all WCP elements on a page and validates them.
 *
 * @param rootElement The root element to search within (defaults to `document.body`).
 * @returns An array of objects, each containing the element and any validation errors.
 */
declare function validateAllWcpElements(rootElement?: HTMLElement): WcpValidationError[];

export { type WcpValidationError, validateAllWcpElements };
