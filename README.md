# Web Components Workspace

[![Netlify Status](https://api.netlify.com/api/v1/badges/4cc663fa-d0c0-486b-b108-559ba35fb3ff/deploy-status)](https://app.netlify.com/sites/wc-workspace-demojtgf4zsprh/deploys)

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
