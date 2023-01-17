export interface Token {
  value: string;
  type: string;
  subtype: string;
}

export interface Options {
  language?: 'en-US' | 'de-DE' | 'en-EU';
  keepPrefixOperators: boolean;
  preserveLanguage?: boolean;
  asClass?: boolean;
}

declare function tokenize(str: string, options?: Options): Token[];
