import InvalidStyleError from '../errors/InvalidStyleError';
import { isStyle } from '../helpers';
import { Segment } from './segment';

export type CueCSSProperty =
    | 'color'
    | 'opacity'
    | 'visibility'
    | 'textDecoration'
    | 'textDecorationColor'
    | 'textDecorationLine'
    | 'textDecorationStyle'
    | 'textDecorationThickness'
    | 'textShadow'
    | 'background'
    | 'backgroundColor'
    | 'backgroundImage'
    | 'backgroundClip'
    | 'backgroundOrigin'
    | 'backgroundPosition'
    | 'backgroundRepeat'
    | 'backgroundSize'
    | 'outline'
    | 'outlineColor'
    | 'outlineStyle'
    | 'outlineWidth'
    | 'font'
    | 'fontFamily'
    | 'fontSize'
    | 'fontStyle'
    | 'fontVariant'
    | 'fontWeight'
    | 'fontStretch'
    | 'lineHeight'
    | 'whiteSpace'
    | 'textCombineUpright'
    | 'rubyPosition';

const CUE_SUPPORTED_PROPS = new Set([
    'color',
    'opacity',
    'visibility',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-style',
    'text-decoration-thickness',
    'text-shadow',
    'background',
    'background-color',
    'background-image',
    'background-clip',
    'background-origin',
    'background-position',
    'background-repeat',
    'background-size',
    'outline',
    'outline-color',
    'outline-style',
    'outline-width',
    'font',
    'font-family',
    'font-size',
    'font-style',
    'font-variant',
    'font-weight',
    'font-stretch',
    'line-height',
    'white-space',
    'text-combine-upright',
    'ruby-position',
]);

export type StyleRule = {
    selectors: string[];
    declarations: Partial<Pick<CSSStyleDeclaration, CueCSSProperty>>;
};

export class Style extends Segment {
    _type = 'style' as const;

    #rules: StyleRule[];

    constructor(rules: StyleRule[]) {
        super();

        this.#rules = rules;
    }

    get rules() {
        return this.#rules;
    }

    addRule(rule: StyleRule) {
        this.#rules.push(rule);
        return this;
    }

    removeRule(index: number) {
        this.#rules.splice(index, 1);
        return this;
    }

    static fromString(str: string): Style {
        if (!isStyle(str)) {
            throw new InvalidStyleError('Invalid style segment', str);
        }

        const { rules } = str.match(/^STYLE\n(?<rules>[\s\S]+?)(?:\n\n|$)/)!.groups!;

        // Strip CSS comments
        const stripped = rules.replace(/\/\*[\s\S]*?\*\//g, '');
        const ruleRegex = /([\s\S]+?)\s*\{([^}]*)\}/g;
        const styleRules: StyleRule[] = [];

        let match: RegExpExecArray | null;
        while ((match = ruleRegex.exec(stripped)) !== null) {
            const selectors = match[1]
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean);

            const declarations = {} as Partial<Pick<CSSStyleDeclaration, CueCSSProperty>>;
            for (const declaration of match[2].split(';')) {
                const trimmed = declaration.trim();
                if (!trimmed) continue;

                const colonIndex = trimmed.indexOf(':');
                if (colonIndex === -1) continue;

                const prop = trimmed.slice(0, colonIndex).trim();
                const value = trimmed.slice(colonIndex + 1).trim();
                if (!prop || !value || !CUE_SUPPORTED_PROPS.has(prop)) continue;

                const camelProp = prop.replace(/-([a-z])/g, (_, l: string) => l.toUpperCase());
                (declarations as Record<string, string>)[camelProp] = value;
            }

            styleRules.push({ selectors, declarations });
        }

        return new Style(styleRules);
    }

    toJSON(): Record<string, any> {
        return {
            _type: this._type,
            rules: this.#rules,
        };
    }

    toString(format?: 'vtt' | 'srt'): string {
        if (format === 'srt') {
            return '';
        }

        return (
            'STYLE\n' +
            this.#rules
                .map(
                    (rule) =>
                        `${rule.selectors.join(',\n')} {\n` +
                        Object.entries(rule.declarations)
                            .map(
                                ([prop, value]) =>
                                    `  ${prop.replace(/([A-Z])/g, (_, c) => `-${c.toLowerCase()}`)}: ${value};`,
                            )
                            .join('\n') +
                        '\n}',
                )
                .join('\n')
        );
    }

    get valid(): boolean {
        // Per spec §4.1: style block CSS content must not contain '-->'.
        const content = this.toString().slice('STYLE\n'.length);
        return !content.includes('-->');
    }
}
