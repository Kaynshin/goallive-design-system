import '../dist/goallive.css';

/**
 * Global theme decorator — wraps every story in a canvas <div> carrying
 * `data-theme="dark|light"`, which drives the semantic --gl-color-* aliases
 * defined in dist/goallive.css (`:root` = dark default, `[data-theme="light"]` / .gl-light override).
 */
const withTheme = (Story, context) => {
  const theme = context.globals.theme || 'dark';
  const wrapper = document.createElement('div');
  wrapper.setAttribute('data-theme', theme);
  wrapper.className = 'gl-sans sb-canvas';
  wrapper.style.minHeight = '100%';
  wrapper.style.padding = '0';
  wrapper.style.background = 'var(--gl-color-canvas)';
  wrapper.style.color = 'var(--gl-color-text)';
  wrapper.style.fontFamily = 'var(--gl-font-sans)';

  const result = Story();
  if (typeof result === 'string') {
    wrapper.innerHTML = result;
  } else if (result instanceof Node) {
    wrapper.appendChild(result);
  }
  return wrapper;
};

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'canvas-dark',
      values: [
        { name: 'canvas-dark', value: '#0B0B0C' },
        { name: 'canvas-light', value: '#FFFFFF' },
        { name: 'ink-800', value: '#141417' },
        { name: 'paper-50', value: '#F5F6FB' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color|fill|bg)$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Goallive global theme (data-theme)',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
