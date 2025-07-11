import type { Generator, ProjectContext } from '@/types'
import { ErrorMessages } from '@/constants/errors'
import { ErrorFactory } from '@/error/factory'
import { generateGitignore, generateHanaLogo, generateHtmlTemplate, generateReadmeTemplate, generateViteEnvFile } from '@/utils/template'

export const reactGenerator: Generator = {
  generate(context) {
    const { config, fileExtension } = context
    if (config.projectType !== 'react')
      throw ErrorFactory.validation(ErrorMessages.validation.invalidProjectType(config.projectType))

    const projectName = config.targetDir || 'hana-project'

    if (config.buildTool === 'vite') {
      context.viteConfigEditor!.addImport('viteConfig', `import react from '@vitejs/plugin-react'`)
      context.viteConfigEditor!.addVitePlugin('viteConfig', `react()`)
    }

    // 1. Generate src directory structure
    const appFileName = `src/app${fileExtension}x`
    context.files[appFileName] = generateAppFile()

    const mainFileName = `src/main${fileExtension}x`
    context.files[mainFileName] = generateMainFile(appFileName)

    const counterFileName = `src/components/counter.${fileExtension}x`
    context.files[counterFileName] = generateCounterFile()

    if (config.language === 'typescript') {
      context.files['src/vite-env.d.ts'] = generateViteEnvFile()
    }

    // 2. Generate root files
    context.files['public/favicon.svg'] = generateHanaLogo()

    context.files['index.html'] = generateHtmlTemplate(
      'react project',
      `/${mainFileName}`,
    )

    context.files['README.md'] = generateReadmeTemplate(
      config.projectType,
      projectName,
      'A React project',
    )

    context.files['.gitignore'] = generateGitignore()

    // 3. Modify package.json
    context.packageJson.name = projectName
    context.packageJson.description = 'A React project'
    context.packageJson.version = '1.0.0'
    context.packageJson.license = 'MIT'
    context.packageJson.engines = {
      node: '>=18.12.0', // V18 LTS
    }

    // 4. Features
    if (config.cssFramework && config.cssFramework !== 'none') {
      generateCssFramework(context)
    }
    if (config.cssPreprocessor) {
      generateCssPreprocessor(context)
    }
  },
}

function generateAppFile() {
  return `function App() {
  return (
    <h1>Hello, vite + react</h1>
  )
}

export default App
`
}

function generateMainFile(appFileName: string) {
  return `import { createRoot } from 'react-dom/client'
import App from './${appFileName}'

createRoot(document.getElementById('root')!).render(<App />)
`
}

function generateCounterFile() {
  return `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>
        Count:
        {count}
      </h1>
      <button type="button" onClick={() => setCount(count + 1)}>+</button>
      <button type="button" onClick={() => setCount(count - 1)}>-</button>
    </div>
  )
}
`
}

// Handle CSS Framework option
function generateCssFramework(context: ProjectContext) {
  const generateUnoCssConfig = () => `import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetWebFonts,
    presetWind3,
    transformerDirectives,
    transformerVariantGroup,
  } from 'unocss'
  
  export default defineConfig({
    presets: [
      /* Core Presets */
      presetWind3(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts(),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
  })
  `

  const { config, packageJson } = context
  if (config.projectType !== 'react')
    throw ErrorFactory.validation(ErrorMessages.validation.invalidProjectType(config.projectType))

  switch (config.cssFramework) {
    case 'tailwindcss': {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies.tailwindcss = '^4.1.11'
      if (config.buildTool === 'vite') {
        packageJson.devDependencies['@tailwindcss/vite'] = '^4.1.11'
        context.files['src/styles/global.css'] = `@import "tailwindcss";`
        context.viteConfigEditor!.addImport('viteConfig', `import tailwindcss from '@tailwindcss/vite'`)
        context.viteConfigEditor!.addVitePlugin('viteConfig', `tailwindcss()`)
        context.mainEditor!.addImport('main', `import './styles/global.css'`)
      }
      break
    }
    case 'unocss': {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies.unocss = '^66.3.3'
      if (config.buildTool === 'vite') {
        context.files['uno.config.ts'] = generateUnoCssConfig()
        context.viteConfigEditor!.addImport('viteConfig', `import UnoCSS from 'unocss/vite'`)
        context.viteConfigEditor!.addVitePlugin('viteConfig', `UnoCSS()`)
        context.mainEditor!.addImport('main', `import 'virtual:uno.css'`)
      }
      break
    }
  }
}

// Handle CSS Preprocessor option
function generateCssPreprocessor(context: ProjectContext) {
  const { config, packageJson } = context
  if (config.projectType !== 'react')
    throw ErrorFactory.validation(ErrorMessages.validation.invalidProjectType(config.projectType))

  switch (config.cssPreprocessor) {
    case 'less': {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies.less = '^4.3.0'
      break
    }
    case 'scss': {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies.sass = '^1.89.2'
      break
    }
  }
}

// Handle Routing Library option
function generateRoutingLibrary(context: ProjectContext) {
  const { config, packageJson } = context
  if (config.projectType !== 'react')
    throw ErrorFactory.validation(ErrorMessages.validation.invalidProjectType(config.projectType))

  const generateReactRouterIndex = () => `import { createBrowserRouter } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: () => import('./pages/home'),
  }
])
`

  const generateDefaultPage = () => `export default function Home() {
  return <div>This is default page</div>
}
`

  switch (config.routingLibrary) {
    case 'react-router': {
      packageJson.dependencies = packageJson.dependencies || {}
      packageJson.dependencies['react-router'] = '^7.6.3'

      context.files[`src/router/index${context.fileExtension}x`] = generateReactRouterIndex()
      context.files[`src/pages/home/index${context.fileExtension}x`] = generateDefaultPage()
      break
    }
    case 'tanstack-router': {
      break
    }
    case 'wouter': {
      break
    }
  }
}
