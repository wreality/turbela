import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/storage/app/lighthouse-schema.graphql',
  documents: ['src/**/*.vue', 'src/**/*.ts', '!src/gql/**/*'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
      presetConfig: {
        fragmentMasking: false
      }
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
