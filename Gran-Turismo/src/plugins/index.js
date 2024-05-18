/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import router from '@/router'
import { createPinia } from 'pinia'
import vuetify from './vuetify'

export function registerPlugins (app) {
  app.use(router)
  app.use(createPinia())
  app.use(vuetify)
}
