# Web Components Workspace

"Write once, publish anywhere"

## Online deployment of example components

Using this workspace, the [`src/components`](/src/components/) directory has been automatically deployed to the following locations

- Documentation: [wc-workspace-demojtgf4zsprh.netlify.app](https://wc-workspace-demojtgf4zsprh.netlify.app)
- NPM: [npmjs.com/package/@hudson-newey/web-components](https://www.npmjs.com/package/@hudson-newey/web-components)
- CDN: [esm.run/@hudson-newey/web-components](https://esm.run/@hudson-newey/web-components)
- GitHub Releases: [github.com/hudson-newey/webcomponents-workspace/releases](https://github.com/hudson-newey/webcomponents-workspace/releases)

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
<script type="module" src="https://esm.run/@hudson-newey/web-components"></script>
```

Full page example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Component CDN Example</title>
    <script type="module" src="https://esm.run/@hudson-newey/web-components"></script>
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
import * from "@hudson-newey/web-components";
```

### GitHub Releases

You can manually import the example components in this repository using the [GitHub releases page](https://github.com/hudson-newey/webcomponents-workspace/releases)

Pre-compiled source files and raw TypeScript files can be found on this page
