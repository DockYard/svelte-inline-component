# vite-plugin-svelte-inline-components

This component allows you to define components inline using tagged template in your tests.
Used in conjunction with Vitest, it makes for a far better experience testing sveltekit apps as you can test things that were previously impossible or impractical, like
components that take blocks or several components that interact with each other, at once.

## Installation and configuration

Assuming you have Vitest already configured, you first have to install the package with:

```shell
npm i -D vite-plugin-svelte-inline-components
```

The in your `vitest.config.js` add this plugin to the list of plugins:

```js
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltekitViteConfig } from './svelte.config.js'
import path from 'path';
import svelteInlineComponents from 'vite-plugin-svelte-inline-components';

export default defineConfig({
  ...sveltekitViteConfig,
  plugins: [
    svelte({ hot: !process.env.VITEST, }),
    svelteInlineComponents(), // <------ here
  ],
  test: {
    global: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
    },
  },
});
```

You're good to go.

## Usage in tests

Now in your tests instead of importing a component and rendering it with `render(MyButton, { props: { title: 'foo' } })` you can import
the `svelte` tagged template and use components as you would in your real app (note that the test's function must be async).

```js
import { cleanup, render } from '@testing-library/svelte'
import { svelte } from 'vite-plugin-svelte-inline-components';

describe('MyComponent.svelte', () => {
  // TODO: @testing-library/svelte claims to add this automatically but it doesn't work without explicit afterEach
  afterEach(() => cleanup())

  it('renders a link with the given href', async () => {
    const { getByTestId } = render(await svelte`
      <script>import MyButton from '$lib/MyButton.svelte';</script>
      <MyButton title="foo">
        Look ma! I'm using slots!!
      </MyButton>
    `);
    expect(getByTestId('button')).to.have.class('submit');
    expect(getByTestId('button')).to.have.text("Look ma! I'm using slots!!");
  });
});
```