import { boot } from 'quasar/wrappers'
import { FluentBundle } from '@fluent/bundle'
import { createFluentVue } from 'fluent-vue'

const bundle = new FluentBundle('en')

const fluent = createFluentVue({
  bundles: [bundle],
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(fluent)
})

export { fluent }
