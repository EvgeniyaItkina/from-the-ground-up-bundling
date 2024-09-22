- `npm run test:playwright` - NPM loads the Playwright code - Node.js
- `playwright` - Playwright code runs - Node.js
- `playwright.config.ts` - Playwright imports this file and runs it - Node.js
- `npm run start` - NPM runs the start script - Node.js
- `src/serve.ts` - Fastify runs and listens on localhost:3000 - Node.js
- `test/playwright/counter.spec.ts` - Playwright runs this test - Node.js
- `test/playwright/counter.spec.ts` - Node.js executes `page.goto('/')` - Node.js

Playwright opens the browser and navigates to `http://localhost:3000/`

- `src/serve.js` - serves `index.html` - Node.js`
- `public/index.html` - browser receives `index.html` and runs `script` - Browser
- `src/serve.js` - serves `script.js` - Node.js
- `public/script.js` - browser receives `script.js` and runs it - Browser

- `test/playwright/counter.spec.ts` - Node.js executes `page.click('button')` - Node.js
- `public/script.js` - runs event handler for click - Browser
