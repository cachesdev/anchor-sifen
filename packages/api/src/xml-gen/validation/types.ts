export type RuleId = string;

export interface ValidationError {
  id: RuleId;
  message: string;
}

export interface ValidationRule<T> {
  id: RuleId;
  description: string;
  tags: string[];
  when: (doc: T) => boolean;
  check: (doc: T) => boolean;
  message: (doc: T) => string;
}

export interface ItemValidationRule<TDoc, TItem> {
  id: RuleId;
  description: string;
  tags: string[];
  when: (item: TItem, index: number, doc: TDoc) => boolean;
  check: (item: TItem, index: number, doc: TDoc) => boolean;
  message: (item: TItem, index: number, doc: TDoc) => string;
}
