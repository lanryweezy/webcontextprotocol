import {
  parseWCP
} from "./chunk-MUJVHCS5.js";

// wcp-validator.ts
var VALID_ACTIONS = /* @__PURE__ */ new Set(["add", "purchase", "search", "submit", "delete", "cancel", "navigate", "toggle"]);
var VALID_EFFECTS = /* @__PURE__ */ new Set(["async", "navigate", "modal", "download"]);
function validateWCP(wcpData) {
  const errors = [];
  if (wcpData.action && !VALID_ACTIONS.has(wcpData.action)) {
    errors.push(`Invalid action: "${wcpData.action}". Must be one of: ${[...VALID_ACTIONS].join(", ")}`);
  }
  if (wcpData.effect && !VALID_EFFECTS.has(wcpData.effect)) {
    errors.push(`Invalid effect: "${wcpData.effect}". Must be one of: ${[...VALID_EFFECTS].join(", ")}`);
  }
  if (wcpData.action === "toggle" && !wcpData.state) {
    errors.push('An element with "action:toggle" must also have a "state" attribute.');
  }
  return errors;
}
function validateAllWcpElements(rootElement = document.body) {
  const elements = rootElement.querySelectorAll("[data-wcp]");
  const results = [];
  for (const element of elements) {
    const wcpString = element.getAttribute("data-wcp");
    const parsedData = parseWCP(wcpString);
    const errors = validateWCP(parsedData);
    if (errors.length > 0) {
      results.push({
        element,
        errors
      });
    }
  }
  return results;
}
export {
  validateAllWcpElements
};
/**
 * @file wcp-validator.ts
 * @license CC0
 * @author Your Name
 * @description A validator for the Web Context Protocol (WCP).
 */
