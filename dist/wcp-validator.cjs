"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// wcp-validator.ts
var wcp_validator_exports = {};
__export(wcp_validator_exports, {
  validateAllWcpElements: () => validateAllWcpElements
});
module.exports = __toCommonJS(wcp_validator_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  validateAllWcpElements
});
/**
 * @file wcp-parser.ts
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */
/**
 * @file wcp-validator.ts
 * @license CC0
 * @author Your Name
 * @description A validator for the Web Context Protocol (WCP).
 */
