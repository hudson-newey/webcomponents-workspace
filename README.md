# Web Components Workspace

## Workspace Configuration

We recommend using the `webcomponents.code-workspace` in VSCode & running `package.json` scripts through the "NPM Scripts" view.

## How to use

### Development Environment

- Run the "storybook" launch option from the VSCode debugger (_recommend_)
- Run the "storybook" script from the vscode npm scripts
- Run `pnpm dev` from a terminal window

### CDN

You can import web components through the CDN

Script tag snippet:

```html
<script
  type="script/javascript"
  src="https://65cc5ec90cc2ec73f1d3d561--wc-workspace-demojtgf4zsprh.netlify.app/components/todoList.js"
></script>
```

Full page example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Web Component CDN Example</title>
    <script
      type="script/javascript"
      src="https://main--wc-workspace-demojtgf4zsprh.netlify.app65cc5ec90cc2ec73f1d3d561--wc-workspace-demojtgf4zsprh.netlify.app/components/todoList.js"
    ></script>
  </head>

  <body>
    <my-todo-list></my-todo-list>
  </body>
</html>
```

### NPM
