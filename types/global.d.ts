declare type Indexable<T = any> = {
  [key: string]: T;
};

export interface Response {
  message: string
  timestamp: Date
  code: number
}
