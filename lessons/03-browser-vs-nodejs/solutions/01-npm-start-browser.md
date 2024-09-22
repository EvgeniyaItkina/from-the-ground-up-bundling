- `npm` - runs start - Node.js
- `src/serve.js` - runs and listens on localhost:3000 - Node.js

Browser navigates to `htttp://localhost:3000/`

- `src/serve.js` - serves `index.html` - Node.js`
- `public/index.html` - browser receives `index.html` and runs `script` - Browser
- `src/serve.js` - serves `script.js` - Node.js
- `public/script.js` - browser receives `script.js` and runs it - Browser

User clicks on "+" button

- `public/script.js` - runs event handler for click - Browser
