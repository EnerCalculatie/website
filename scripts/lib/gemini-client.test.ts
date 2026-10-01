import { describe, it, expect, vi } from 'vitest';
vi.hoisted(() => {
  process.env.GEMINI_API_KEY = 'test-key';
});
import { pickFallbackModels, parseRetryDelay } from './gemini-client.mjs';

const gen = ['generateContent'];

describe('pickFallbackModels', () => {
  it('kiest generateContent-flash-modellen: stabiel vóór preview, lite achteraan, nieuwste eerst', () => {
    const models = [
      { name: 'models/gemini-3.6-flash', supportedGenerationMethods: gen },
      { name: 'models/gemini-2.5-flash', supportedGenerationMethods: gen },
      { name: 'models/gemini-3.5-flash', supportedGenerationMethods: gen },
      { name: 'models/gemini-3.6-flash-lite', supportedGenerationMethods: gen },
      { name: 'models/gemini-3.7-flash-preview', supportedGenerationMethods: gen },
      { name: 'models/gemini-3.6-flash-image', supportedGenerationMethods: gen },
      { name: 'models/gemini-3.6-pro', supportedGenerationMethods: gen },
      { name: 'models/text-embedding-004', supportedGenerationMethods: ['embedContent'] },
    ];
    expect(pickFallbackModels(models, 'gemini-3.6-flash', 5)).toEqual([
      'gemini-3.5-flash',
      'gemini-2.5-flash',
      'gemini-3.6-flash-lite',
      'gemini-3.7-flash-preview',
    ]);
  });
});

describe('parseRetryDelay', () => {
  it('leest retryDelay uit een 429-body', () => {
    expect(parseRetryDelay('{"@type":"type.googleapis.com/google.rpc.RetryInfo","retryDelay": "17s"}')).toBe(17000);
    expect(parseRetryDelay('geen hint')).toBeNull();
  });
});
