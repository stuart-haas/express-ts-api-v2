export type RequestQuery = {
  filter?: { op: string, filters: { [key: string]: string} };
  order?: string[];
  scope?: { [key: string]: string }
}
