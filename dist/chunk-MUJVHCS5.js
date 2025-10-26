// wcp-parser.ts
function parseWCP(wcpString) {
  const result = {};
  if (!wcpString) {
    return result;
  }
  const pairs = wcpString.split(";");
  for (const pair of pairs) {
    const parts = pair.split(":");
    if (parts.length === 2) {
      const key = parts[0].trim();
      const value = parts[1].trim();
      result[key] = value;
    }
  }
  return result;
}
function findAllWcpElements(rootElement = document.body) {
  const elements = rootElement.querySelectorAll("[data-wcp]");
  const results = [];
  for (const element of elements) {
    const wcpString = element.getAttribute("data-wcp");
    const parsedData = parseWCP(wcpString);
    results.push({
      element,
      data: parsedData
    });
  }
  return results;
}

export {
  parseWCP,
  findAllWcpElements
};
/**
 * @file wcp-parser.ts
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */
