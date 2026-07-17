// Regressietests voor de deterministische contentgates. Elke case hier komt uit
// een fout die ooit live stond of de pipeline liet vastlopen (zie de comments in
// content-checks.mjs). Faalt een test, dan is een van die bugs terug.
import { describe, it, expect } from 'vitest';
import {
  MAX_TITLE_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  countBodyWords,
  checkPlanItem,
  truncateAtWord,
  deriveSeoTitle,
  checkArticleMeta,
  checkComponentBody,
  checkNoAmounts,
  checkSavingsClaims,
  topicOverlap,
  findDuplicateTopic,
  extractInternalLinks,
} from './content-checks.mjs';

describe('countBodyWords', () => {
  it('telt woorden zonder tags mee', () => {
    expect(countBodyWords('<p>een <strong>twee</strong> drie</p>')).toBe(3);
  });
  it('is 0 op lege body', () => {
    expect(countBodyWords('<p></p>')).toBe(0);
  });
});

describe('checkPlanItem', () => {
  it('keurt een schone NL-titel goed', () => {
    expect(checkPlanItem({ title: 'Hybride warmtepomp dimensioneren', keyword: 'hybride warmtepomp' })).toEqual([]);
  });
  it('vlagt het corruptie-token ptrdiff (stond live in een titel)', () => {
    const errors = checkPlanItem({ title: 'Warmtepomp ptrdiff kopen', keyword: 'warmtepomp' });
    expect(errors.some((e) => e.includes('ptrdiff'))).toBe(true);
  });
  it('vlagt ingemengde anderstalige woorden (backlog-bug "faut disrupted")', () => {
    const errors = checkPlanItem({ title: 'Hoe klanten faut disrupted tijdens stroomstoring', keyword: 'stroomstoring' });
    expect(errors.some((e) => e.includes('anderstalige'))).toBe(true);
  });
  it('laat NL-woorden die op Engelse lijken met rust (die/der/in/over)', () => {
    expect(checkPlanItem({ title: 'Advies over de installateur die het doet', keyword: 'installateur advies' })).toEqual([]);
  });
  it('vlagt niet-Latijnse tekens', () => {
    const errors = checkPlanItem({ title: 'Warmtepomp 你好 kopen', keyword: 'warmtepomp' });
    expect(errors.some((e) => e.includes('niet-Latijnse'))).toBe(true);
  });
  it('vlagt lege velden', () => {
    expect(checkPlanItem({ title: '  ', keyword: 'x' }).some((e) => e.includes('title'))).toBe(true);
  });
});

describe('truncateAtWord', () => {
  it('laat korte tekst ongemoeid', () => {
    expect(truncateAtWord('Korte titel', 60)).toBe('Korte titel');
  });
  it('knipt op zinsgrens en laat geen leesteken achter', () => {
    const out = truncateAtWord('Hybride warmtepomp dimensioneren: gasketel behouden of vervangen bij renovatie', 40);
    expect(out).toBe('Hybride warmtepomp dimensioneren');
  });
  it('knipt op woordgrens als er geen bruikbare zinsgrens is', () => {
    const out = truncateAtWord('een twee drie vier vijf zes zeven acht negen tien elf', 20);
    expect(out.length).toBeLessThanOrEqual(20);
    expect(out.endsWith(' ')).toBe(false);
  });
});

describe('deriveSeoTitle', () => {
  it('houdt een geldige seoTitle ongewijzigd', () => {
    expect(deriveSeoTitle({ seoTitle: 'Warmtepomp kiezen in 2026', title: 'X' })).toEqual({
      seoTitle: 'Warmtepomp kiezen in 2026',
      derived: false,
    });
  });
  it('leidt af uit title als seoTitle te lang is', () => {
    const long = 'A'.repeat(70);
    const res = deriveSeoTitle({ seoTitle: long, title: 'Fallback titel' });
    expect(res.derived).toBe(true);
    expect(res.seoTitle.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
  });
  it('vervangt een seoTitle met niet-Latijnse tekens', () => {
    const res = deriveSeoTitle({ seoTitle: 'Warmtepomp 你好', title: 'Warmtepomp kopen' });
    expect(res.derived).toBe(true);
  });
});

describe('checkArticleMeta', () => {
  const ok = {
    title: 'Warmtepomp kiezen: complete gids',
    seoTitle: 'Warmtepomp kiezen in 2026',
    description: 'Alles over het kiezen van een warmtepomp voor jouw woning.',
    slug: 'warmtepomp-kiezen',
  };
  it('keurt een correct artikel goed', () => {
    expect(checkArticleMeta(ok)).toEqual([]);
  });
  it('vlagt seoTitle boven de tekenlimiet', () => {
    const errors = checkArticleMeta({ ...ok, seoTitle: 'A'.repeat(MAX_TITLE_LENGTH + 1) });
    expect(errors.some((e) => e.includes('seoTitle is'))).toBe(true);
  });
  it('vlagt description boven de limiet', () => {
    const errors = checkArticleMeta({ ...ok, description: 'A'.repeat(MAX_DESCRIPTION_LENGTH + 1) });
    expect(errors.some((e) => e.includes('description is'))).toBe(true);
  });
  it('vlagt het merksuffix in seoTitle', () => {
    const errors = checkArticleMeta({ ...ok, seoTitle: 'Warmtepomp kiezen | EnerCalculatie' });
    expect(errors.some((e) => e.includes('merksuffix'))).toBe(true);
  });
  it('vlagt seoTitle die met kleine letter begint (bug "hybride warmtepomp business case")', () => {
    const errors = checkArticleMeta({ ...ok, seoTitle: 'hybride warmtepomp business case' });
    expect(errors.some((e) => e.includes('kleine letter'))).toBe(true);
  });
  it('vlagt seoTitle die letterlijk het zoekwoord is', () => {
    const errors = checkArticleMeta({ ...ok, seoTitle: 'Warmtepomp kiezen', keyword: 'warmtepomp kiezen' });
    expect(errors.some((e) => e.includes('zoekwoord'))).toBe(true);
  });
  it('vlagt een vuile slug', () => {
    const errors = checkArticleMeta({ ...ok, slug: 'Warmtepomp_Kiezen!' });
    expect(errors.some((e) => e.includes('kebab-case'))).toBe(true);
  });
});

describe('checkComponentBody', () => {
  const body = '<h2>Kop</h2><p className="x">Tekst met genoeg inhoud.</p>';
  it('keurt een correcte body goed', () => {
    expect(checkComponentBody(body)).toEqual([]);
  });
  it('vlagt class= i.p.v. className= (bug commit 251269e)', () => {
    const errors = checkComponentBody('<h2>Kop</h2><p class="x">Tekst</p>');
    expect(errors.some((e) => e.includes("'class='"))).toBe(true);
  });
  it('vlagt een ontbrekende h2', () => {
    const errors = checkComponentBody('<p>Geen koppen hier.</p>');
    expect(errors.some((e) => e.includes('<h2>'))).toBe(true);
  });
  it('vlagt een dubbele h1', () => {
    const errors = checkComponentBody('<h1>Titel</h1><h2>Kop</h2>');
    expect(errors.some((e) => e.includes('<h1>'))).toBe(true);
  });
  it('matcht NaN alleen als los woord, niet in "kanaal"', () => {
    expect(checkComponentBody('<h2>Kop</h2><p>Het kanaal is open.</p>')).toEqual([]);
    const errors = checkComponentBody('<h2>Kop</h2><p>De waarde is NaN hier.</p>');
    expect(errors.some((e) => e.includes('NaN'))).toBe(true);
  });
});

describe('checkNoAmounts', () => {
  it('laat tekst zonder bedrag door', () => {
    expect(checkNoAmounts('De actuele bedragen staan op rvo.nl.')).toEqual([]);
  });
  it('vlagt een euro-bedrag', () => {
    expect(checkNoAmounts('De ISDE bedraagt maximaal €5.000 per aanvraag.').length).toBe(1);
  });
});

describe('checkSavingsClaims', () => {
  it('vlagt een kale besparingsclaim met percentage', () => {
    expect(checkSavingsClaims('Een besparing van meer dan 40% op de energiekosten.').length).toBeGreaterThan(0);
  });
  it('laat een marge staan (20-60%, afhankelijk van isolatie)', () => {
    expect(checkSavingsClaims('Je bespaart 20-60% afhankelijk van de isolatie.')).toEqual([]);
  });
  it('laat een technisch percentage zonder besparingstaal staan', () => {
    expect(checkSavingsClaims('85% van het licht bereikt het paneel.')).toEqual([]);
  });
  it('laat "rendementsverlies van ruim 15%" staan (false-positive-regressie)', () => {
    expect(checkSavingsClaims('Dit geeft een rendementsverlies van ruim 15% in de voormiddag.')).toEqual([]);
  });
  it('vlagt "tot wel 60%" marketingtaal', () => {
    expect(checkSavingsClaims('Bespaar tot wel 60% op je rekening.').length).toBeGreaterThan(0);
  });
});

describe('topicOverlap / findDuplicateTopic', () => {
  it('scoort ISDE-warmtepomp-duplicaten hoog', () => {
    const a = { title: 'ISDE subsidie warmtepompen aanvragen', keyword: 'isde subsidie warmtepomp' };
    const b = { title: 'Warmtepompen kopen met ISDE subsidie', keyword: 'isde subsidie warmtepomp' };
    expect(topicOverlap(a, b)).toBeGreaterThanOrEqual(0.45);
  });
  it('scoort niet-verwante onderwerpen laag', () => {
    const a = { title: 'Netcongestie wachtlijst zakelijk', keyword: 'netcongestie' };
    const b = { title: 'Thuisbatterij capaciteit kiezen', keyword: 'thuisbatterij' };
    expect(topicOverlap(a, b)).toBeLessThan(0.45);
  });
  it('normaliseert meervoud met klinkerverlenging (laadpaal/laadpalen)', () => {
    const a = { title: 'Laadpaal plaatsen bij bedrijf', keyword: 'laadpaal' };
    const b = { title: 'Laadpalen installeren zakelijk', keyword: 'laadpalen' };
    expect(topicOverlap(a, b)).toBeGreaterThan(0);
  });
  it('findDuplicateTopic vindt de sterkste match', () => {
    const cand = { title: 'ISDE subsidie warmtepomp aanvragen', keyword: 'isde warmtepomp' };
    const existing = [
      { title: 'Thuisbatterij kiezen', keyword: 'thuisbatterij', slug: 'a' },
      { title: 'ISDE subsidie warmtepompen gids', keyword: 'isde warmtepomp', slug: 'b' },
    ];
    const hit = findDuplicateTopic(cand, existing);
    expect(hit?.match.slug).toBe('b');
  });
  it('geeft null als er geen duplicaat is', () => {
    const cand = { title: 'Salderingsregeling vervalt 2027', keyword: 'saldering' };
    const existing = [{ title: 'Warmtepomp kiezen', keyword: 'warmtepomp', slug: 'a' }];
    expect(findDuplicateTopic(cand, existing)).toBeNull();
  });
});

describe('extractInternalLinks', () => {
  it('haalt unieke root-relatieve links op, zonder anchors/query', () => {
    const src = '<a href="/blog/x">x</a><a href="/blog/x#top">x</a><a href="/prijzen?a=1">p</a><a href="https://ext.nl">e</a>';
    expect(extractInternalLinks(src).sort()).toEqual(['/blog/x', '/prijzen']);
  });
});
