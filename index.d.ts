export interface Token {
  value: string;
  type: string;
  subtype: string;
}

export interface Options {
  language?: 'en-US' | 'de-DE' | 'en-EU';
}

declare function tokenize(str: string, options?: Options): Token[];
