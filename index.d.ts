export interface Token {
  value: string;
  type: string;
  subtype: string;
}
declare function tokenize(str: string): Token[];
