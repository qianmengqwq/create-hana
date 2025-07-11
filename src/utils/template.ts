export function renderTemplate(template: string, variables: Record<string, string>) {
  let result = template

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    result = result.replace(regex, value)
  }

  return result
}

export function getFileExtension(language: 'typescript' | 'javascript') {
  return language === 'typescript' ? '.ts' : '.js'
}

export function generateViteEnvFile() {
  return `/// <reference types="vite/client" />
`
}

export function generateGitignore() {
  return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Snowpack dependency directory (https://snowpack.dev/)
web_modules/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env.production

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Gatsby files
.cache/
public

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`
}

export function generateReadmeTemplate(projectType: string, projectName: string, description?: string) {
  return `# ${projectName}

${description || `A ${projectType} project`}

## License

MIT
`
}

export function generateHtmlTemplate(title: string, mainScriptPath: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="${mainScriptPath}"></script>
  </body>
</html>
`
}

// Hana Logo!
export function generateHanaLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flower-icon lucide-flower">
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5"/>
  <path d="M12 7.5V9"/>
  <path d="M7.5 12H9"/>
  <path d="M16.5 12H15"/>
  <path d="M12 16.5V15"/>
  <path d="m8 8 1.88 1.88"/>
  <path d="M14.12 9.88 16 8"/>
  <path d="m8 16 1.88-1.88"/>
  <path d="M14.12 14.12 16 16"/>
</svg>
`
}
