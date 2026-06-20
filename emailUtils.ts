// Escaped gebruikersinvoer voordat deze in een HTML e-mailbody terechtkomt,
// tegen HTML-injectie via formuliervelden (naam, bedrijf, bericht, e-mail).
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
