import { envelopeOf } from '../../../src/core/wrapper';

const json = '{"id":"chatcmpl-1","object":"chat.completion","choices":[{"message":{"content":null}}]}';

describe('envelopeOf', () => {
  it('keeps a clean JSON answer as it is', () => {
    expect(envelopeOf(json)).toBe(json);
  });

  it('takes the JSON out of a whole code block', () => {
    expect(envelopeOf('```json\n' + json + '\n```')).toBe(json);
  });

  it('takes the JSON out when only the closing mark of a code block follows it', () => {
    expect(envelopeOf(json + '\n```')).toBe(json);
  });

  it('takes the JSON out when only the opening mark of a code block precedes it', () => {
    expect(envelopeOf('```\n' + json)).toBe(json);
  });

  it('leaves an answer with words before the JSON as text', () => {
    const answer = 'Ecco un esempio di risposta:\n' + json;
    expect(envelopeOf(answer)).toBe(answer);
  });

  it('leaves an answer with words after the JSON as text', () => {
    const answer = json + '\nSpero sia utile.';
    expect(envelopeOf(answer)).toBe(answer);
  });

  it('leaves a plain answer without braces as it is', () => {
    expect(envelopeOf('Ciao, come posso aiutarti?')).toBe('Ciao, come posso aiutarti?');
  });
});
