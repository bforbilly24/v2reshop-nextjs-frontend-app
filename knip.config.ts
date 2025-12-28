import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  ignore: [
    'src/components/ui/**/*',
    'src/routeTree.gen.ts',
    '**/*.d.ts',
    'postcss.config.mjs',
    'tailwind.config.ts',
  ],
  ignoreDependencies: [
    '@types/node',
    '@types/react',
    '@types/react-dom',
    'typescript',
  ],
  entry: [
    'src/app/**/page.tsx',
    'src/app/**/layout.tsx',
    'src/app/**/route.ts',
    'src/app/**/error.tsx',
    'src/app/**/loading.tsx',
    'src/app/**/not-found.tsx',
    'src/app/**/template.tsx',
    'src/middleware.ts',
    'next.config.ts',
  ],
  project: ['src/**/*.{ts,tsx,js,jsx}'],
}

export default config
