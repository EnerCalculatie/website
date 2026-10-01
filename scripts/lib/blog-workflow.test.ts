import { describe, expect, it } from 'vitest';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const workflow = readFileSync(new URL('../../.github/workflows/publish-blog-post.yml', import.meta.url), 'utf8').replaceAll('\r\n', '\n');
const guard = workflow.split('        id: guard\n        run: |\n')[1]
  .split('\n      - name:')[0].replace(/^ {10}/gm, '');

interface Clock { day: string; hour?: string; event?: string; force?: string; publishedToday?: boolean }

function proceeds({ day, hour = '06', event = 'schedule', force = 'false', publishedToday = false }: Clock) {
  const dir = mkdtempSync(join(tmpdir(), 'blog-schedule-'));
  const output = join(dir, 'output').replaceAll('\\', '/');
  const script = guard
    .replaceAll('${{ github.event_name }}', event)
    .replaceAll('${{ github.event.inputs.force }}', force);
  const stubs = `date() {
    case "$1" in
      +%u) echo "${day}" ;;
      +%H) echo "${hour}" ;;
      +%FT00:00:00%z) echo "2026-10-01T00:00:00+0200" ;;
      *) echo "test date" ;;
    esac
  }
  git() { ${publishedToday ? 'echo abc1234' : 'true'}; }
`;
  try {
    execFileSync(process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash', ['-s'], {
      input: stubs + script,
      env: { ...process.env, GITHUB_OUTPUT: output },
    });
    return readFileSync(output, 'utf8').trim() === 'proceed=true';
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

describe('automatische blogplanning', () => {
  it('plant alleen dinsdag en donderdag, vanaf 04:00 UTC met inhaalmomenten', () => {
    expect([...workflow.matchAll(/- cron: '([^']+)'/g)].map(m => m[1]))
      .toEqual(['0 4,5,7,9,11,13 * * 2,4']);
  });
  it('publiceert op dinsdag en donderdag vanaf 06:00 lokaal', () => {
    expect(proceeds({ day: '2' })).toBe(true);
    expect(proceeds({ day: '4', hour: '10' })).toBe(true);
  });
  it('wacht in de winter tot 06:00 (04:00 UTC = 05:00 CET)', () => {
    expect(proceeds({ day: '2', hour: '05' })).toBe(false);
    expect(proceeds({ day: '2', hour: '08' })).toBe(true);
  });
  it('slaat andere dagen over', () => {
    expect(proceeds({ day: '5' })).toBe(false);
    expect(proceeds({ day: '1', hour: '12' })).toBe(false);
  });
  it('publiceert maximaal één artikel per dag — latere inhaal-triggers stoppen', () => {
    expect(proceeds({ day: '4', hour: '13', publishedToday: true })).toBe(false);
  });
  it('laat handmatige uitzonderingen alleen met force toe', () => {
    expect(proceeds({ day: '5', event: 'workflow_dispatch' })).toBe(false);
    expect(proceeds({ day: '5', event: 'workflow_dispatch', force: 'true' })).toBe(true);
    expect(proceeds({ day: '2', hour: '03', event: 'workflow_dispatch' })).toBe(true);
  });
  it('stelt alle drie Gemini-stappen op free in, zonder betaalde sleutel', () => {
    expect(workflow.match(/GEMINI_TIER: free/g)).toHaveLength(3);
    expect(workflow).not.toContain('GEMINI_API_KEY_PAID');
    expect(workflow).not.toContain('inputs.tier');
  });
});
