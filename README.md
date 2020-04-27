# parcel-plugin-playcanvas

This [parcel](https://parceljs.org/) plugin will upload the bundle to PlayCanvas project asset. Then it would help the local development workflow i.e. Local IDE > Parcel bundler > Auto update / hot reload PlayCanvas scripts.

> This works with PlayCanvas script 2.0 since they have removed the local server development!

# How to use
- `npm install --save-dev parcel-plugin-playcanvas` or `yarn add -D parcel-plugin-playcanvas` on your main project
- The main project should use **parcel** as the bundler, recommend my other [playcanvas-typescript-template](https://github.com/hxhieu/playcanvas-typescript-template), with only ONE output file for example `parcel build ./src/index.ts -o bundle.js`
- Need these env vars set so the plugin can authorise with PlayCanvas
  - `PLAYCANVAS_PROJECT_ID`
  - `PLAYCANVAS_ASSET_ID`
  - `PLAYCANVAS_ACCESS_TOKEN`
  
  Please follow [https://github.com/whydoidoit/babel-playcanvas-template](https://github.com/whydoidoit/babel-playcanvas-template#building-debugging-and-testing-your-code) on how to get the above
- That's it and **parcel** will do the rest!

```
$ parcel build ./src/index.ts -o bundle.js
✨  Built in 162ms.

dist/bundle.js.map    7.14 KB    18ms
dist/bundle.js        4.51 KB    37ms
Uploading script bundle to PlayCanvas... DONE!
✨  Done in 2.96s.
```

# Inspiration and credits
[https://github.com/whydoidoit/babel-playcanvas-template](https://github.com/whydoidoit/babel-playcanvas-template)
[https://github.com/snowfrogdev/typescript-playcanvas-template](https://github.com/snowfrogdev/typescript-playcanvas-template)

Thank you!