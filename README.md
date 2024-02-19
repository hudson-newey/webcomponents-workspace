# Web Components Workspace

[![Netlify Status](https://api.netlify.com/api/v1/badges/4cc663fa-d0c0-486b-b108-559ba35fb3ff/deploy-status)](https://app.netlify.com/sites/wc-workspace-demojtgf4zsprh/deploys)

Write once, publish anywhere"

## Online deployment of example components

Using this workspace, the [`src/components`](/src/components/) directory has been automatically deployed to the following locations

- Storybook documentation: [wc-workspace-demojtgf4zsprh.netlify.app/storybook](https://wc-workspace-demojtgf4zsprh.netlify.app/storybook)
- NPM: [npmjs.com/package/@hudson-newey/web-components](https://www.npmjs.com/package/@hudson-newey/web-components)
- GitHub Releases: [github.com/hudson-newey/webcomponents-workspace/tags](https://github.com/hudson-newey/webcomponents-workspace/tags)
- CDN: [wc-workspace-demojtgf4zsprh.netlify.app/todoList.js](https://wc-workspace-demojtgf4zsprh.netlify.app/todoList.js)

## Workspace Configuration

We recommend using the `webcomponents.code-workspace` in VSCode & running `package.json` scripts through the "NPM Scripts" view.

## How to use

### Architecture

This GitHub template has two distinct parts: The web-component workspace/development environment
and the components that you want to publish.

#### web-component workspace

Handles publishing, documentation, and testing

#### component publishing repo

Found under `src/components`, you can develop all your components in isolation here.
This folder can be published as its own NPM package, and be exported without any dependencies linking it back to the
web-component-workspace mono-repo.

You can also add sub-modules to this directory to include them in the web-component workspace (this template).

### Development Environment

- Run the "storybook" launch option from the VSCode debugger (_recommend_)
- Run the "storybook" script from the vscode npm scripts
- Run `pnpm dev` from a terminal window

### CDN

You can import web components through the CDN

Script tag snippet:

```html
<script type="script/javascript" src="https://wc-workspace-demojtgf4zsprh.netlify.app/todoList.js"></script>
```

Full page example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Component CDN Example</title>
    <script type="script/javascript" src="https://wc-workspace-demojtgf4zsprh.netlify.app/todoList.js"></script>
  </head>

  <body>
    <my-todo-list></my-todo-list>
  </body>
</html>
```

### NPM

You can add the example components used in this repository by using the following command

```sh
$ npm i @hudson-newey/web-components
>
```

You can then import them into a file using

```js
import { TodoList } from "node-modules/@hudson-newey/web-components/todoList";
```

#### Using automatically generated TypeScript types

You can use the typescript types through the following code

```ts
import { TodoList, TodoListProps } from "node-modules/@hudson-newey/webcomponents/@types/todoList";
```

### Using TypeScript (instead of JavaScript)

```js
import { TodoList } from "node-modules/@hudson-newey/web-components/js/todoList";
```

_Note: The `js/` directory in the from file path_

### GitHub Releases

You can manually import the example components in this repository using the [GitHub releases page](https://github.com/hudson-newey/webcomponents-workspace/tags)

Pre-compiled source files and raw TypeScript files can be found on this page
