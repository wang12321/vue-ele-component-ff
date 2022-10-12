module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/common/**/*.vue',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ]
}
