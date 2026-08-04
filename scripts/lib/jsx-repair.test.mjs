import { describe, expect, it } from 'vitest';
import { transform } from 'esbuild';
import { extractJsx, jsxDiagnostic } from './jsx-repair.mjs';

function componentSource(body) {
  return `export function Article() {
  return (
    <main>
${body}
    </main>
  );
}`;
}

describe('JSX-herstel voor de bloggenerator', () => {
  it('herstelt een body die eerst op een onverwachte F faalt naar compileerbare JSX', async () => {
    const invalid = componentSource('<p>1-fase naar 3-fase Fase-overbelasting</p');

    let error;
    try {
      await transform(invalid, { loader: 'tsx', jsx: 'automatic' });
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(jsxDiagnostic(invalid, error)).toContain('JSX-context rond regel');

    const modelResponse = '```jsx\n<p>1-fase naar 3-fase: fase-overbelasting voorkomen.</p>\n```';
    const repaired = componentSource(extractJsx(modelResponse));
    await expect(transform(repaired, { loader: 'tsx', jsx: 'automatic' })).resolves.toBeDefined();
  });
});
