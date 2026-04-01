import { describe, it, expect } from 'vitest';
import { Style } from '../../src/segments/style';
import InvalidStyleError from '../../src/errors/InvalidStyleError';

describe('Style', () => {
    describe('constructor & getters', () => {
        it('stores the provided rules', () => {
            const rules = [{ selectors: ['::cue'], declarations: { color: 'white' } }];
            const s = new Style(rules);
            expect(s.rules).toEqual(rules);
        });

        it('stores an empty rules array', () => {
            const s = new Style([]);
            expect(s.rules).toEqual([]);
        });
    });

    describe('addRule()', () => {
        it('appends a rule and returns the style', () => {
            const s = new Style([]);
            const rule = { selectors: ['::cue(b)'], declarations: { fontWeight: 'bold' } };
            const result = s.addRule(rule);
            expect(result).toBe(s);
            expect(s.rules).toHaveLength(1);
            expect(s.rules[0]).toEqual(rule);
        });
    });

    describe('removeRule()', () => {
        it('removes a rule by index and returns the style', () => {
            const s = new Style([
                { selectors: ['::cue'], declarations: { color: 'white' } },
                { selectors: ['::cue(b)'], declarations: { fontWeight: 'bold' } },
            ]);
            const result = s.removeRule(0);
            expect(result).toBe(s);
            expect(s.rules).toHaveLength(1);
            expect(s.rules[0].selectors).toEqual(['::cue(b)']);
        });
    });

    describe('valid', () => {
        it('returns true for a normal style block', () => {
            const s = new Style([{ selectors: ['::cue'], declarations: { color: 'white' } }]);
            expect(s.valid).toBe(true);
        });

        it('returns false when CSS content contains -->', () => {
            // Construct a style that would serialise with --> in it
            // We have to be creative: the valid check serialises to string then checks
            const s = new Style([{ selectors: ['::cue'], declarations: {} }]);
            // Directly inject a bad selector to cause --> in output
            s.addRule({ selectors: ['::cue --> bad'], declarations: { color: 'red' } });
            expect(s.valid).toBe(false);
        });
    });

    describe('toString()', () => {
        it('outputs a STYLE block with a single rule', () => {
            const s = new Style([{ selectors: ['::cue'], declarations: { color: 'white' } }]);
            const output = s.toString();
            expect(output).toContain('STYLE');
            expect(output).toContain('::cue');
            expect(output).toContain('color: white;');
        });

        it('outputs multiple declarations per rule', () => {
            const s = new Style([
                {
                    selectors: ['::cue'],
                    declarations: { color: 'white', backgroundColor: 'black' },
                },
            ]);
            const output = s.toString();
            expect(output).toContain('color: white;');
            expect(output).toContain('background-color: black;');
        });

        it('outputs multiple rules', () => {
            const s = new Style([
                { selectors: ['::cue'], declarations: { color: 'white' } },
                { selectors: ['::cue(b)'], declarations: { fontWeight: 'bold' } },
            ]);
            const output = s.toString();
            expect(output).toContain('::cue');
            expect(output).toContain('::cue(b)');
        });

        it('returns empty string in srt format', () => {
            const s = new Style([{ selectors: ['::cue'], declarations: { color: 'white' } }]);
            expect(s.toString('srt')).toBe('');
        });
    });

    describe('toJSON()', () => {
        it('returns the rules array', () => {
            const rules = [{ selectors: ['::cue'], declarations: { color: 'white' } }];
            const s = new Style(rules);
            expect(s.toJSON()).toEqual({ _type: 'style', rules });
        });
    });

    describe('fromString()', () => {
        it('parses a single rule block', () => {
            const raw = 'STYLE\n::cue {\n  color: white;\n}';
            const s = Style.fromString(raw);
            expect(s.rules).toHaveLength(1);
            expect(s.rules[0].selectors).toContain('::cue');
            expect(s.rules[0].declarations).toMatchObject({ color: 'white' });
        });

        it('parses multiple CSS declarations in one rule', () => {
            const raw = 'STYLE\n::cue {\n  color: white;\n  background-color: black;\n}';
            const s = Style.fromString(raw);
            expect(s.rules[0].declarations).toMatchObject({
                color: 'white',
                backgroundColor: 'black',
            });
        });

        it('converts kebab-case CSS properties to camelCase', () => {
            const raw = 'STYLE\n::cue {\n  font-size: 1.2em;\n  text-shadow: 1px 1px black;\n}';
            const s = Style.fromString(raw);
            expect(s.rules[0].declarations).toMatchObject({
                fontSize: '1.2em',
                textShadow: '1px 1px black',
            });
        });

        it('parses multiple selectors on the same rule', () => {
            const raw = 'STYLE\n::cue(b),\n::cue(strong) {\n  font-weight: bold;\n}';
            const s = Style.fromString(raw);
            expect(s.rules[0].selectors).toContain('::cue(b)');
            expect(s.rules[0].selectors).toContain('::cue(strong)');
        });

        it('parses multiple rules in one STYLE block', () => {
            const raw = 'STYLE\n::cue {\n  color: white;\n}\n::cue(b) {\n  font-weight: bold;\n}';
            const s = Style.fromString(raw);
            expect(s.rules).toHaveLength(2);
        });

        it('strips CSS comments', () => {
            const raw = 'STYLE\n::cue {\n  /* this is a comment */\n  color: white;\n}';
            const s = Style.fromString(raw);
            expect(s.rules[0].declarations).toMatchObject({ color: 'white' });
            expect(Object.keys(s.rules[0].declarations)).toHaveLength(1);
        });

        it('ignores CSS properties not in the WebVTT allowed set', () => {
            const raw = 'STYLE\n::cue {\n  color: white;\n  margin: 10px;\n}';
            const s = Style.fromString(raw);
            // margin is not in the allowed set
            expect(s.rules[0].declarations).not.toHaveProperty('margin');
            expect(s.rules[0].declarations).toHaveProperty('color');
        });

        it('throws InvalidStyleError for non-STYLE input', () => {
            expect(() => Style.fromString('NOTSTYLE\n::cue { color: red; }')).toThrow(
                InvalidStyleError,
            );
        });

        it('round-trips: fromString → toString → fromString produces the same rules', () => {
            const raw = 'STYLE\n::cue {\n  color: white;\n  opacity: 0.9;\n}';
            const s1 = Style.fromString(raw);
            // toString converts camelCase \u2192 kebab-case; fromString converts back to camelCase.
            // The declarations stored in each instance should be identical.
            const s2 = Style.fromString('STYLE\n' + s1.toString().slice('STYLE\n'.length));
            expect(s2.rules[0].declarations).toMatchObject(s1.rules[0].declarations);
        });
    });
});
