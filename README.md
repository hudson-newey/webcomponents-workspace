# Web Components Workspace

"Write once, publish anywhere"

## Online deployment of example components

Using this workspace, the [`src/components`](/src/components/) directory has been automatically deployed to the following locations

- Documentation: [wc-workspace-demojtgf4zsprh.netlify.app](https://wc-workspace-demojtgf4zsprh.netlify.app)
- NPM: [npmjs.com/package/@hudson-newey/web-components](https://www.npmjs.com/package/@hudson-newey/web-components)
- CDN: [jsdelivr.com/package/npm/@hudson-newey/web-components](https://www.jsdelivr.com/package/npm/@hudson-newey/web-components)
- GitHub Releases: [github.com/hudson-newey/webcomponents-workspace/releases](https://github.com/hudson-newey/webcomponents-workspace/releases)

## How to use

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
