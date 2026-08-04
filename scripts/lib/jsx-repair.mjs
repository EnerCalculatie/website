/** Haalt uitsluitend de JSX-body uit een herstelantwoord van het model. */
export function extractJsx(raw) {
  const match = raw.match(/```(?:jsx|tsx)\s*([\s\S]*?)```/i);
  const jsx = (match?.[1] ?? raw).trim();
  if (!jsx) throw new Error('Kon geen JSX-body uit het herstelantwoord halen.');
  return jsx;
}

/** Geeft de compilerfout met een kleine, bruikbare broncontext terug. */
export function jsxDiagnostic(source, err) {
  const location = err.message.match(/<stdin>:(\d+):(\d+)/);
  if (!location) return err.message;

  const line = Number(location[1]);
  const column = Number(location[2]);
  const lines = source.split('\n');
  const from = Math.max(0, line - 3);
  const to = Math.min(lines.length, line + 2);
  const snippet = lines
    .slice(from, to)
    .map((content, index) => `${String(from + index + 1).padStart(4)} | ${content}`)
    .join('\n');

  return `${err.message}\nJSX-context rond regel ${line}, kolom ${column}:\n${snippet}`;
}
