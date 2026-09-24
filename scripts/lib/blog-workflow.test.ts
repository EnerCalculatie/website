import { describe, expect, it } from 'vitest';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const workflow = readFileSync(new URL('../../.github/workflows/publish-blog-post.yml', import.meta.url), 'utf8').replaceAll('\r\n', '\n');
const guard = workflow.split('        id: guard\n        run: |\n')[1]
  .split('\n      - name:')[0].replace(/^ {10}/gm, '');

function proceeds(day: string, date: string, cron: string, zone = 'CEST', event = 'schedule', force = 'false') {
  const dir = mkdtempSync(join(tmpdir(), 'blog-schedule-'));
  const output = join(dir, 'output').replaceAll('\\', '/');
  const script = guard
    .replaceAll('${{ github.event_name }}', event)
    .replaceAll('${{ github.event.inputs.force }}', force)
    .replaceAll('${{ github.event.schedule }}', cron);
  const clock = `date() {
    case "$1" in
      +%F) echo "${date}" ;;
      +%u) echo "${day}" ;;
      +%Z) echo "${zone}" ;;
      +%z) echo "${zone === 'CEST' ? '+0200' : '+0100'}" ;;
      *) echo "test date" ;;
    esac
  }
`;
  try {
    execFileSync(process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash', ['-s'], {
      input: clock + script,
      env: { ...process.env, GITHUB_OUTPUT: output },
    });
    return readFileSync(output, 'utf8').trim() === 'proceed=true';
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe('automatische blogplanning', () => {
  it('plant alleen dinsdag en donderdag', () => {
    expect([...workflow.matchAll(/- cron: '([^']+)'/g)].map(m => m[1]))
      .toEqual(['0 4 * * 2,4', '0 5 * * 2,4']);
  });
  it('start niet voor 29 september', () => {
    expect(proceeds('4', '2026-09-24', '0 4 * * 2,4')).toBe(false);
  });
  it('draait de eerste dinsdag en donderdag', () => {
    expect(proceeds('2', '2026-09-29', '0 4 * * 2,4')).toBe(true);
    expect(proceeds('4', '2026-10-01', '0 4 * * 2,4')).toBe(true);
  });
  it('slaat vrijdag over', () => {
    expect(proceeds('5', '2026-10-02', '0 4 * * 2,4')).toBe(false);
  });
  it('voorkomt een dubbele run in zomer- en wintertijd', () => {
    expect(proceeds('2', '2026-09-29', '0 5 * * 2,4')).toBe(false);
    expect(proceeds('2', '2026-10-27', '0 4 * * 2,4', 'CET')).toBe(false);
    expect(proceeds('2', '2026-10-27', '0 5 * * 2,4', 'CET')).toBe(true);
  });
  it('laat handmatige uitzonderingen alleen met force toe', () => {
    expect(proceeds('5', '2026-10-02', '', 'CEST', 'workflow_dispatch')).toBe(false);
    expect(proceeds('5', '2026-10-02', '', 'CEST', 'workflow_dispatch', 'true')).toBe(true);
  });
  it('stelt alle drie Gemini-stappen op free in, zonder betaalde sleutel', () => {
    expect(workflow.match(/GEMINI_TIER: free/g)).toHaveLength(3);
    expect(workflow).not.toContain('GEMINI_API_KEY_PAID');
    expect(workflow).not.toContain('inputs.tier');
  });
});
