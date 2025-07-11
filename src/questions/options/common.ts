export const COMMON_LANGUAGE_OPTIONS = [
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JavaScript', value: 'javascript' },
] as const

export const COMMON_MANAGER_OPTIONS = [
  { label: 'pnpm', value: 'pnpm' },
  { label: 'yarn', value: 'yarn' },
  { label: 'npm', value: 'npm' },
  { label: 'bun', value: 'bun' },
] as const

export const COMMON_CODE_QUALITY_TOOLS_OPTIONS = [
  { label: 'ESLint', value: 'eslint' },
  { label: 'ESLint and Prettier', value: 'eslint-prettier' },
  { label: 'Biome', value: 'biome' },
  { label: 'None', value: 'none' },
] as const
