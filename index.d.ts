export interface Token {
  value: string;
  type: string;
  subtype: string;
}

export interface Options {
  language?: 'en-US' | 'de-DE';
  keepPrefixOperators: boolean;
}

declare function tokenize(str: string, options?: Options): Token[];
