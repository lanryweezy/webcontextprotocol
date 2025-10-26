# Web Context Protocol (WCP) Specification v0.2

## 1. Introduction

The Web Context Protocol (WCP) is a proposed HTML standard for providing context to AI agents interacting with web pages. It uses a single HTML attribute, `data-wcp`, to describe the intended purpose and behavior of interactive elements. This allows developers to control how AI agents interpret and interact with their applications, ensuring safer and more predictable outcomes.

## 2. The `data-wcp` Attribute

The `data-wcp` attribute is the core of WCP. It can be added to any HTML element to provide contextual information to AI agents.

### 2.1. Syntax

The value of the `data-wcp` attribute is a string of semicolon-separated key-value pairs.

- **Format:** `key:value; key2:value2; ...`
- **Keys:** Keys are strings that define a specific aspect of the element's context (e.g., `action`, `purpose`).
- **Values:** Values are strings that describe the key (e.g., `add`, `email`).

### 2.2. Example

```html
<button data-wcp="action:add; object:cart; group-id:product-123; primary:true">
  Add to Cart
</button>
```

In this example, the `data-wcp` attribute communicates the following to an AI agent:
- **`action:add`**: The primary action of this button is to "add" something.
- **`object:cart`**: The object of the action is the "cart".
- **`group-id:product-123`**: This button is part of a group of elements related to product 123.
- **`primary:true`**: This is a primary action on the page.

## 3. Core Schema

The WCP schema is designed to be extensible. The following keys form the core of the protocol.

### 3.1. Interaction Keys

These keys describe how a user (or an AI agent) can interact with an element.

#### 3.1.1. `action`

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
| `toggle`   | Toggles the state of an element (e.g., on/off).   |

#### 3.1.2. `effect`

The `effect` key describes the expected outcome of interacting with the element.

| Value      | Description                                                           |
|------------|-----------------------------------------------------------------------|
| `async`    | The action is performed asynchronously without a full page reload.    |
| `navigate` | The action causes a navigation to a new URL.                          |
| `modal`    | The action opens a modal dialog.                                      |
| `download` | The action initiates a file download.                                 |

### 3.2. Form Input Keys

These keys provide context for form fields, helping agents understand what data to provide.

#### 3.2.1. `purpose`

The `purpose` key describes the kind of information expected in a form field.

*Example:*
```html
<input type="text" data-wcp="purpose:search-query">
<input type="email" data-wcp="purpose:email">
```

### 3.3. Data Extraction Keys

These keys help agents identify and understand specific pieces of non-interactive data on a page.

#### 3.3.1. `value`

The `value` key identifies an element as containing a specific data point. Developers can use custom value names and add other attributes for more context.

*Example:*
```html
<span data-wcp="value:price; currency:USD">19.99</span>
<h1 data-wcp="value:product-name; group-id:product-123">Product Name</h1>
```

### 3.4. Context and Relationship Keys

These keys provide additional context about an element's state or its relationship to other elements.

#### 3.4.1. `object`

The `object` key provides context about the object of an action. Its value is a developer-defined string.

#### 3.4.2. `primary`

The `primary` key indicates whether an action is a primary action on the page. Its value can be `true` or `false`.

#### 3.4.3. `state`

The `state` key describes the current state of a stateful element. It is often used with `action:toggle`.

*Example:*
```html
<button data-wcp="action:toggle; effect:async; state:off">
  Turn on Notifications
</button>
```

#### 3.4.4. `group-id`

The `group-id` key associates multiple elements that are part of the same conceptual group (e.g., a product card).

*Example:*
```html
<div class="product-card">
  <h2 data-wcp="value:product-name; group-id:product-456">Another Product</h2>
  <span data-wcp="value:price; currency:USD; group-id:product-456">25.00</span>
  <button data-wcp="action:add; object:cart; group-id:product-456">Add to Cart</button>
</div>
```

## 4. License

This specification is released under the CC0 license (public domain).
