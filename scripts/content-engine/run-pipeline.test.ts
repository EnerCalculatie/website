// Regressietest voor pickNextPlannedItem — bepaalt welk onderwerp de
// cron-run zonder expliciet argument oppakt. Had 0% dekking. run-pipeline.ts
// zelf (de orchestratie van alle 7 agents) wordt bewust niet end-to-end
// unit-getest: elke agent afzonderlijk is al gedekt, en de losse
// execSync/build/git-onderdelen worden al elke di/vr-run live geverifieerd.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
// run-pipeline.ts importeert (via elke agent) LLMService.ts, dat op zijn beurt
// gemini-config.mjs importeert — die doet process.exit(1) zonder API-key in de
// env. Moet dus al gezet zijn vóórdat de (hoisted) import hieronder draait.
vi.hoisted(() => {
  process.env.GEMINI_API_KEY = 'test-key';
});
import { pickNextPlannedItem, requiredContentType } from './run-pipeline';

describe('pickNextPlannedItem', () => {
  let dir: string;

  beforeEach(() => {
    dir = mkdtempSync(path.join(tmpdir(), 'pipeline-test-'));
    mkdirSync(path.join(dir, 'ai-context'));
  });
  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  function writePlan(items: unknown[]) {
    writeFileSync(path.join(dir, 'ai-context/content-plan.json'), JSON.stringify(items), 'utf-8');
  }

  it('kiest het planned-item met de hoogste priority', () => {
    writePlan([
      { title: 'laag', status: 'planned', priority: 3 },
      { title: 'hoog', status: 'planned', priority: 9 },
      { title: 'midden', status: 'planned', priority: 5 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('hoog');
  });

  it('negeert items die niet de status planned hebben', () => {
    writePlan([
      { title: 'al gegenereerd', status: 'generated', priority: 10 },
      { title: 'nog te doen', status: 'planned', priority: 1 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('nog te doen');
  });

  it('geeft null als er geen planned-items zijn', () => {
    writePlan([{ title: 'x', status: 'generated', priority: 5 }]);
    expect(pickNextPlannedItem(dir)).toBeNull();
  });

  it('geeft null als content-plan.json niet bestaat', () => {
    expect(pickNextPlannedItem(dir)).toBeNull();
  });

  it('behandelt een ontbrekende priority als 0', () => {
    writePlan([
      { title: 'zonder-priority', status: 'planned' },
      { title: 'met-priority', status: 'planned', priority: 1 },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('met-priority');
  });

  it('geeft bij een requiredType voorrang aan een matchend item, ook als het lagere prioriteit heeft', () => {
    writePlan([
      { title: 'seo-hoog', status: 'planned', priority: 9, contentType: 'SEO' },
      { title: 'practical-laag', status: 'planned', priority: 3, contentType: 'PRACTICAL' },
    ]);
    expect(pickNextPlannedItem(dir, 'PRACTICAL')?.title).toBe('practical-laag');
  });

  it('valt terug op hoogste prioriteit ongeacht type als geen enkel item het gevraagde type heeft', () => {
    writePlan([
      { title: 'seo-hoog', status: 'planned', priority: 9, contentType: 'SEO' },
      { title: 'seo-laag', status: 'planned', priority: 3, contentType: 'SEO' },
    ]);
    expect(pickNextPlannedItem(dir, 'PRACTICAL')?.title).toBe('seo-hoog');
  });

  it('kiest hoogste prioriteit zonder requiredType, ongeacht contentType (bestaand gedrag)', () => {
    writePlan([
      { title: 'a', status: 'planned', priority: 5, contentType: 'PRACTICAL' },
      { title: 'b', status: 'planned', priority: 8, contentType: 'SEO' },
    ]);
    expect(pickNextPlannedItem(dir)?.title).toBe('b');
  });
});

describe('requiredContentType', () => {
  it('geeft SEO op dinsdag (Europe/Amsterdam)', () => {
    expect(requiredContentType(new Date('2026-08-25T10:00:00Z'))).toBe('SEO'); // dinsdag
  });

  it('geeft PRACTICAL op vrijdag (Europe/Amsterdam)', () => {
    expect(requiredContentType(new Date('2026-08-28T10:00:00Z'))).toBe('PRACTICAL'); // vrijdag
  });

  it('geeft undefined op een andere dag', () => {
    expect(requiredContentType(new Date('2026-08-26T10:00:00Z'))).toBeUndefined(); // woensdag
  });

  it('rekent in Europe/Amsterdam-lokale tijd, niet UTC (relevant rond middernacht)', () => {
    // 2026-08-24 23:30 UTC = 2026-08-25 01:30 CEST (Europe/Amsterdam) -> dinsdag lokaal
    expect(requiredContentType(new Date('2026-08-24T23:30:00Z'))).toBe('SEO');
  });
});
