export interface Option {
  label: string
  value: string
}

export type AllKeys<T> = T extends any ? keyof T : never
