/**
 * @file wcp-parser.ts
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */
interface WcpData {
    [key: string]: string;
}
interface WcpElement {
    element: HTMLElement;
    data: WcpData;
}
/**
 * Parses a WCP string into a JavaScript object.
 *
 * @param wcpString The WCP string to parse (e.g., "action:add; object:cart").
 * @returns A key-value map of the parsed WCP attributes.
 */
declare function parseWCP(wcpString: string | null): WcpData;
/**
 * Finds all elements with the `data-wcp` attribute and parses their values.
 *
 * @param rootElement The root element to search within (defaults to `document.body`).
 * @returns An array of objects, each containing the element and its parsed WCP data.
 */
declare function findAllWcpElements(rootElement?: HTMLElement): WcpElement[];

export { type WcpData, type WcpElement, findAllWcpElements, parseWCP };
