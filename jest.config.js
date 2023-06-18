module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  jest: {
    moduleFileExtensions: [
      "js",
      "json",
      "vue"
    ],
    transform: {
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
