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

// wcp-parser.ts
var wcp_parser_exports = {};
__export(wcp_parser_exports, {
  findAllWcpElements: () => findAllWcpElements,
  parseWCP: () => parseWCP
});
module.exports = __toCommonJS(wcp_parser_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findAllWcpElements,
  parseWCP
});
/**
 * @file wcp-parser.ts
 * @license CC0
 * @author David Osemwegie
 * @description A dependency-free parser for the Web Context Protocol (WCP).
 */
