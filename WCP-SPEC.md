# Web Context Protocol (WCP) Specification v0.1

## 1. Introduction

The Web Context Protocol (WCP) is a proposed HTML standard for providing context to AI agents interacting with web pages. It uses a single HTML attribute, `data-wcp`, to describe the intended purpose and behavior of interactive elements. This allows developers to control how AI agents interpret and interact with their applications, ensuring safer and more predictable outcomes.

## 2. The `data-wcp` Attribute

The `data-wcp` attribute is the core of WCP. It can be added to any HTML element to provide contextual information to AI agents.

### 2.1. Syntax

The value of the `data-wcp` attribute is a string of semicolon-separated key-value pairs.

- **Format:** `key:value; key2:value2; ...`
- **Keys:** Keys are strings that define a specific aspect of the element's context (e.g., `action`, `effect`).
- **Values:** Values are strings that describe the key (e.g., `add`, `async`).

### 2.2. Example

```html
<button data-wcp="action:add; object:cart; effect:async; primary:true">
  Add to Cart
</button>
```

In this example, the `data-wcp` attribute communicates the following to an AI agent:
- **`action:add`**: The primary action of this button is to "add" something.
- **`object:cart`**: The object of the action is the "cart".
- **`effect:async`**: Clicking this button will trigger an asynchronous action (e.g., an AJAX request) and will not cause a page navigation.
- **`primary:true`**: This is a primary action on the page.

## 3. Core Schema

The following are the initial proposed keys for the WCP schema. The schema is designed to be extensible, allowing developers to add custom keys and values as needed.

### 3.1. `action`

The `action` key describes the primary purpose of the element.

| Value      | Description                                       |
|------------|---------------------------------------------------|
| `add`      | Adds an item to a collection (e.g., cart, list).  |
| `purchase` | Initiates a purchase or checkout process.         |
| `search`   | Performs a search.                                |
| `submit`   | Submits a form.                                   |
| `delete`   | Deletes an item or resource.                      |
| `cancel`   | Cancels an action or closes a modal.              |
| `navigate` | Navigates to a different page or view.            |

### 3.2. `effect`

The `effect` key describes the expected outcome of interacting with the element.

| Value      | Description                                                           |
|------------|-----------------------------------------------------------------------|
| `async`    | The action is performed asynchronously without a full page reload.    |
| `navigate` | The action causes a navigation to a new URL.                          |
| `modal`    | The action opens a modal dialog.                                      |
| `download` | The action initiates a file download.                                 |

### 3.3. `object`

The `object` key (optional) provides context about the object of the action. Its value is a string that can be defined by the developer.

### 3.4. `primary`

The `primary` key (optional) indicates whether the action is a primary action on the page. Its value can be `true` or `false`.

## 4. Extensibility

Developers can extend WCP by defining their own custom keys and values to suit their application's specific domain. For example, a project management application might define a custom action like `action:create-task`.

## 5. License

This specification is released under the CC0 license (public domain).
