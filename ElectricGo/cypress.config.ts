import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
})

const setupNodeEvents = require('cypress-image-diff-js/dist/plugin')
module.exports = defineConfig({
video: false,
screenshotOnRunFailure: true,
e2e: {
setupNodeEvents,
}
})