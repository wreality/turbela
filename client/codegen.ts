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
        scalars: {
          DateTimeTz: 'DateTime',
        }
      },
      presetConfig: {
        fragmentMasking: false
      }
    },
    './src/gql/graphql.schema.json': {
      plugins: ['introspection'],
      config: {
        minify: true
      }
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
