import { describe, expect, it } from 'vitest';
import { selectRelevantKnowledgeFiles } from './KnowledgeBase';

const ALL_FILES = [
  'airco.md',
  'EMS.md',
  'laadpalen.md',
  'NEN1010.md',
  'netbeheer.md',
  'thuisbatterijen.md',
  'warmtepompen.md',
  'zonnepanelen.md',
];

describe('selectRelevantKnowledgeFiles', () => {
  it('geeft alle bestanden terug zonder topic', () => {
    expect(selectRelevantKnowledgeFiles(ALL_FILES)).toEqual(ALL_FILES);
  });

  it('selecteert alleen airco.md + NEN1010.md voor een SEER/SCOP-airco-onderwerp (regressie 2026-09-04)', () => {
    const result = selectRelevantKnowledgeFiles(
      ALL_FILES,
      'SEER- en SCOP-waarde van een airco: hoe onderbouwt u het jaarlijkse koel- en verwarmingsverbruik?'
    );
    expect(result).toContain('airco.md');
    expect(result).toContain('NEN1010.md');
    expect(result).not.toContain('warmtepompen.md');
  });

  it('selecteert warmtepompen.md + NEN1010.md voor een warmtepomp-onderwerp', () => {
    const result = selectRelevantKnowledgeFiles(ALL_FILES, 'Warmtepomp dimensioneren voor een slecht geïsoleerde woning');
    expect(result).toContain('warmtepompen.md');
    expect(result).not.toContain('airco.md');
    expect(result).not.toContain('zonnepanelen.md');
  });

  it('NEN1010.md gaat altijd mee, ook als het onderwerp er niet expliciet naar verwijst', () => {
    const result = selectRelevantKnowledgeFiles(ALL_FILES, 'Zonnepanelen en salderingsafbouw');
    expect(result).toContain('NEN1010.md');
    expect(result).toContain('zonnepanelen.md');
  });

  it('valt terug op alle bestanden als geen enkel bestand matcht', () => {
    const result = selectRelevantKnowledgeFiles(ALL_FILES, 'Een compleet onderwerp zonder overlap met een kennisbestand');
    expect(result).toEqual(ALL_FILES);
  });

  it('neemt een onbekend bestand (geen keyword-mapping) altijd mee, voor de zekerheid', () => {
    const result = selectRelevantKnowledgeFiles([...ALL_FILES, 'nieuw-domein.md'], 'Warmtepomp-onderwerp');
    expect(result).toContain('nieuw-domein.md');
  });
});
