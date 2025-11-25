# a11y-chart-react

This is a demo project to show accessibility charts and deploy `vite+react+react-router-dom` on github-pages.
[Page Link](https://simonecheng.github.io/coseeing-a11y-tree-demo)

## deploy on github pages

- Set base url in `vite.config.js`.
- Set basename in `router.jsx`.
- Install `gh-pages` and add `"predeploy": "npm run build"`, `"deploy": "gh-pages -d dist"` in `package.json`.
- Run the predeploy and deploy script:
  ```
  pnpm run predeploy // to build the project
  pnpm run deploy
  ```
- Set the resource folder by [offical tutorial](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). Remember to choose `gh-pages` branch instead of `main`, if you want to deploy the resouce which is not in the root.
